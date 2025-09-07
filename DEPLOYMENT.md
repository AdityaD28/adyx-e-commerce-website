# AdyX E-commerce - Production Deployment Guide

This guide will help you deploy AdyX E-commerce to production with Docker, SSL, and monitoring.

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Domain name pointing to your server
- Server with at least 2GB RAM and 20GB storage

### 1. Initial Setup

```bash
# Clone and setup
git clone <your-repo> adyx-ecommerce
cd adyx-ecommerce

# Copy and configure environment
cp .env.production.example .env.production
# Edit .env.production with your production values

# Deploy
./scripts/deploy.sh
```

### 2. SSL Setup (Optional)

```bash
# Setup SSL with Let's Encrypt
./scripts/setup-ssl.sh yourdomain.com
```

## 📋 Detailed Configuration

### Environment Variables

Edit `.env.production` with your production values:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@postgres:5432/adyx_ecommerce"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://yourdomain.com"

# Stripe
STRIPE_SECRET_KEY="sk_live_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_your_stripe_publishable_key"

# Additional configuration...
```

### Database Setup

The deployment script automatically:
- Sets up PostgreSQL with Docker
- Runs migrations
- Seeds initial data

To backup/restore:
```bash
# Create backup
./scripts/backup-db.sh

# Restore from backup
./scripts/restore-db.sh db/backups/backup_file.sql.gz
```

### SSL Configuration

For production with SSL:

1. **Automatic Setup (Recommended)**:
   ```bash
   ./scripts/setup-ssl.sh yourdomain.com
   ```

2. **Manual Setup**:
   - Get certificates from Let's Encrypt or your provider
   - Place certificates in `nginx/certs/`
   - Update `nginx/nginx.conf` with SSL configuration

### Monitoring and Maintenance

```bash
# Health check
./scripts/health-check.sh

# View logs
docker-compose logs -f

# Update application
git pull
docker-compose build --no-cache
docker-compose up -d
```

## 🏗️ Architecture

### Services

- **Frontend**: Next.js application (Port 3000)
- **Database**: PostgreSQL (Port 5434)
- **Cache**: Redis (Port 6379)
- **Proxy**: Nginx (Ports 80/443)

### Security Features

- Rate limiting on API endpoints
- HTTPS enforcement
- Security headers
- Session management with Redis
- Admin route protection

### Performance Optimizations

- Gzip compression
- Static file caching
- Database connection pooling
- CDN-ready static assets

## 🔧 Management Commands

### Docker Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View service status
docker-compose ps

# View logs
docker-compose logs [service-name]

# Restart service
docker-compose restart [service-name]

# Update images
docker-compose pull
docker-compose up -d
```

### Database Commands
```bash
# Access database
docker exec -it adyx-postgres psql -U postgres -d adyx_ecommerce

# Run migrations
docker-compose run --rm frontend npm run db:migrate

# Seed database
docker-compose run --rm frontend npm run db:seed

# Reset database
docker-compose run --rm frontend npm run db:reset
```

### Application Commands
```bash
# Access application container
docker exec -it adyx-frontend bash

# View application logs
docker-compose logs -f frontend

# Restart application
docker-compose restart frontend
```

## 📊 Monitoring

### Health Checks

The application includes health check endpoints:
- `GET /api/health` - Application health
- `GET /api/health/db` - Database health

### Logs

Logs are available via Docker:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f frontend
docker-compose logs -f postgres
docker-compose logs -f nginx
```

### Metrics

For production monitoring, consider integrating:
- **Monitoring**: Prometheus + Grafana
- **Error Tracking**: Sentry
- **Uptime**: UptimeRobot or similar
- **Analytics**: Google Analytics

## 🔐 Security Checklist

### Pre-Production
- [ ] Change all default passwords
- [ ] Set strong `NEXTAUTH_SECRET`
- [ ] Configure proper CORS origins
- [ ] Set up SSL certificates
- [ ] Configure firewall rules
- [ ] Set up database backups

### Post-Deployment
- [ ] Test all critical paths
- [ ] Verify SSL certificate
- [ ] Check rate limiting
- [ ] Test backup/restore
- [ ] Monitor error logs

## 🚨 Troubleshooting

### Common Issues

**Service won't start**:
```bash
# Check logs
docker-compose logs [service-name]

# Check disk space
df -h

# Check port conflicts
netstat -tulpn | grep :3000
```

**Database connection errors**:
```bash
# Check PostgreSQL status
docker exec adyx-postgres pg_isready

# Verify database exists
docker exec adyx-postgres psql -U postgres -l
```

**SSL issues**:
```bash
# Check certificate validity
openssl x509 -enddate -noout -in nginx/certs/fullchain.pem

# Test SSL configuration
curl -I https://yourdomain.com
```

### Performance Issues

**High memory usage**:
```bash
# Check container memory usage
docker stats

# Restart services
docker-compose restart
```

**Slow response times**:
```bash
# Check database performance
docker exec adyx-postgres psql -U postgres -d adyx_ecommerce -c "SELECT * FROM pg_stat_activity;"

# Check application logs
docker-compose logs frontend | grep -i error
```

## 🔄 Updates and Maintenance

### Regular Updates
```bash
# Update codebase
git pull

# Rebuild and restart
docker-compose build --no-cache
docker-compose up -d

# Run migrations if needed
docker-compose run --rm frontend npm run db:migrate
```

### Security Updates
- Monitor for security advisories
- Update dependencies regularly
- Renew SSL certificates before expiry
- Review access logs for anomalies

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review application logs
3. Check GitHub issues
4. Contact the development team

## 📝 Additional Resources

- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/best-practices/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
