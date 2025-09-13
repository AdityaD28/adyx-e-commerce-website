#!/bin/bash

# SSL Setup Script for AdyX E-commerce
# This script helps set up SSL certificates using Let's Encrypt

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if domain is provided
if [ -z "$1" ]; then
    print_error "Usage: $0 <domain.com>"
    print_error "Example: $0 adyx.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

print_status "Setting up SSL for domain: $DOMAIN"
print_status "Using email: $EMAIL"

# Check if certbot is installed
if ! command -v certbot &> /dev/null; then
    print_status "Installing certbot..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install certbot
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo apt-get update
        sudo apt-get install -y certbot
    else
        print_error "Unsupported OS. Please install certbot manually."
        exit 1
    fi
fi

# Create nginx html directory for challenges
mkdir -p nginx/html/.well-known/acme-challenge

# Update nginx configuration for the domain
print_status "Updating nginx configuration for domain: $DOMAIN"

# Create a temporary nginx config for certificate generation
cat > nginx/nginx-ssl-temp.conf << EOF
events {
    worker_connections 1024;
}

http {
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        location /.well-known/acme-challenge/ {
            root /usr/share/nginx/html;
        }
        
        location / {
            return 301 https://\$host\$request_uri;
        }
    }
}
EOF

# Stop current nginx if running
docker-compose stop nginx || true

# Start nginx with temporary config for certificate generation
print_status "Starting nginx for certificate generation..."
docker run -d --name nginx-ssl-temp \
    -p 80:80 \
    -v "$(pwd)/nginx/nginx-ssl-temp.conf:/etc/nginx/nginx.conf" \
    -v "$(pwd)/nginx/html:/usr/share/nginx/html" \
    nginx:alpine

# Generate SSL certificate
print_status "Generating SSL certificate..."
certbot certonly \
    --webroot \
    --webroot-path="$(pwd)/nginx/html" \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

# Stop temporary nginx
docker stop nginx-ssl-temp
docker rm nginx-ssl-temp

# Copy certificates to nginx directory
print_status "Copying certificates..."
sudo cp "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" "nginx/certs/"
sudo cp "/etc/letsencrypt/live/$DOMAIN/privkey.pem" "nginx/certs/"
sudo chown $(whoami):$(whoami) nginx/certs/*.pem

# Update nginx configuration with SSL
print_status "Updating nginx configuration with SSL..."
cat > nginx/nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Rate limiting
    limit_req_zone \$binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone \$binary_remote_addr zone=login:10m rate=5r/m;

    upstream nextjs {
        server frontend:3000;
    }

    # HTTP to HTTPS redirect
    server {
        listen 80;
        server_name $DOMAIN www.$DOMAIN;
        
        location /.well-known/acme-challenge/ {
            root /usr/share/nginx/html;
        }
        
        location / {
            return 301 https://\$host\$request_uri;
        }
    }

    # HTTPS server
    server {
        listen 443 ssl http2;
        server_name $DOMAIN www.$DOMAIN;

        # SSL configuration
        ssl_certificate /etc/nginx/certs/fullchain.pem;
        ssl_certificate_key /etc/nginx/certs/privkey.pem;
        ssl_session_timeout 1d;
        ssl_session_cache shared:MozTLS:10m;
        ssl_session_tickets off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
        ssl_prefer_server_ciphers off;

        location / {
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
            proxy_connect_timeout 30s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
        }

        # API rate limiting
        location /api/ {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }

        # Login endpoint rate limiting
        location /api/auth/ {
            limit_req zone=login burst=5 nodelay;
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }

        # Static files caching
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)\$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
            proxy_pass http://nextjs;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Security headers for admin routes
        location /admin {
            add_header X-Frame-Options DENY;
            add_header X-Robots-Tag noindex;
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Upgrade \$http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
            proxy_cache_bypass \$http_upgrade;
        }
    }
}
EOF

# Update environment variables
print_status "Updating environment variables..."
sed -i.bak "s|NEXTAUTH_URL=.*|NEXTAUTH_URL=\"https://$DOMAIN\"|g" .env.production
sed -i.bak "s|NEXT_PUBLIC_APP_URL=.*|NEXT_PUBLIC_APP_URL=\"https://$DOMAIN\"|g" .env.production

# Create certificate renewal cron job
print_status "Setting up certificate auto-renewal..."
CRON_JOB="0 3 * * * certbot renew --quiet && docker-compose restart nginx"
(crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -

# Clean up
rm -f nginx/nginx-ssl-temp.conf

print_success "SSL setup completed successfully!"
print_status "Your domain $DOMAIN is now configured with SSL."
print_status "Certificate will auto-renew every day at 3 AM."
print_warning "Please restart your services with: docker-compose up -d"
print_status "Your site will be available at: https://$DOMAIN"
