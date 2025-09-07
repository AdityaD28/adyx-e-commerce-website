#!/bin/bash

# Health Check Script for AdyX E-commerce
# This script checks the health of all services

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[⚠]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

echo "🏥 AdyX E-commerce Health Check"
echo "================================"

# Check Docker services
print_status "Checking Docker services..."
SERVICES=$(docker-compose ps --services)
ALL_HEALTHY=true

for service in $SERVICES; do
    if docker-compose ps $service | grep -q "Up"; then
        print_success "$service is running"
    else
        print_error "$service is down"
        ALL_HEALTHY=false
    fi
done

# Check web application
print_status "Checking web application..."
if curl -f -s http://localhost:3000 > /dev/null; then
    print_success "Web application is accessible"
else
    print_error "Web application is not accessible"
    ALL_HEALTHY=false
fi

# Check API health endpoint
print_status "Checking API health endpoint..."
if curl -f -s http://localhost:3000/api/health > /dev/null; then
    print_success "API health endpoint is responding"
else
    print_error "API health endpoint is not responding"
    ALL_HEALTHY=false
fi

# Check database connection
print_status "Checking database connection..."
if docker exec adyx-postgres pg_isready -U postgres > /dev/null 2>&1; then
    print_success "Database is accepting connections"
else
    print_error "Database is not accepting connections"
    ALL_HEALTHY=false
fi

# Check Redis connection
print_status "Checking Redis connection..."
if docker exec adyx-redis redis-cli ping | grep -q "PONG"; then
    print_success "Redis is responding"
else
    print_error "Redis is not responding"
    ALL_HEALTHY=false
fi

# Check disk space
print_status "Checking disk space..."
DISK_USAGE=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -lt 80 ]; then
    print_success "Disk space is adequate ($DISK_USAGE% used)"
elif [ "$DISK_USAGE" -lt 90 ]; then
    print_warning "Disk space is getting low ($DISK_USAGE% used)"
else
    print_error "Disk space is critically low ($DISK_USAGE% used)"
    ALL_HEALTHY=false
fi

# Check memory usage
print_status "Checking memory usage..."
if command -v free > /dev/null; then
    MEMORY_USAGE=$(free | awk 'NR==2{printf "%.0f", $3*100/$2 }')
    if [ "$MEMORY_USAGE" -lt 80 ]; then
        print_success "Memory usage is normal ($MEMORY_USAGE% used)"
    elif [ "$MEMORY_USAGE" -lt 90 ]; then
        print_warning "Memory usage is high ($MEMORY_USAGE% used)"
    else
        print_error "Memory usage is critically high ($MEMORY_USAGE% used)"
        ALL_HEALTHY=false
    fi
fi

# Check SSL certificate (if nginx is configured with SSL)
if [ -f "nginx/certs/fullchain.pem" ]; then
    print_status "Checking SSL certificate..."
    CERT_EXPIRY=$(openssl x509 -enddate -noout -in nginx/certs/fullchain.pem | cut -d= -f2)
    CERT_EXPIRY_EPOCH=$(date -d "$CERT_EXPIRY" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( (CERT_EXPIRY_EPOCH - CURRENT_EPOCH) / 86400 ))
    
    if [ "$DAYS_UNTIL_EXPIRY" -gt 30 ]; then
        print_success "SSL certificate is valid ($DAYS_UNTIL_EXPIRY days until expiry)"
    elif [ "$DAYS_UNTIL_EXPIRY" -gt 7 ]; then
        print_warning "SSL certificate expires soon ($DAYS_UNTIL_EXPIRY days until expiry)"
    else
        print_error "SSL certificate expires very soon ($DAYS_UNTIL_EXPIRY days until expiry)"
        ALL_HEALTHY=false
    fi
fi

echo ""
echo "================================"
if [ "$ALL_HEALTHY" = true ]; then
    print_success "All systems are healthy! 🎉"
    exit 0
else
    print_error "Some systems need attention! 🚨"
    echo ""
    echo "To view logs for troubleshooting:"
    echo "  docker-compose logs [service-name]"
    echo ""
    echo "To restart services:"
    echo "  docker-compose restart [service-name]"
    exit 1
fi
