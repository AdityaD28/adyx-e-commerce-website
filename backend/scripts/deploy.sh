#!/bin/bash

# AdyX E-commerce Production Deployment Script
# This script sets up and deploys the application in production mode

set -e

echo "🚀 Starting AdyX E-commerce deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env.production exists
if [ ! -f .env.production ]; then
    print_warning ".env.production not found. Creating from example..."
    cp .env.production.example .env.production
    print_warning "Please edit .env.production with your production values before running this script again."
    exit 1
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p nginx/certs
mkdir -p nginx/html
mkdir -p db/backups
mkdir -p logs

# Set correct permissions
print_status "Setting correct permissions..."
chmod +x scripts/*.sh
chmod 755 nginx/certs
chmod 755 nginx/html

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down || true

# Pull latest images
print_status "Pulling latest Docker images..."
docker-compose pull

# Build the application
print_status "Building the application..."
docker-compose build --no-cache

# Generate Prisma client and run migrations
print_status "Setting up database..."
docker-compose up -d postgres redis
sleep 10

print_status "Running database migrations..."
docker-compose run --rm frontend npm run db:migrate

print_status "Seeding database with initial data..."
docker-compose run --rm frontend npm run db:seed

# Start all services
print_status "Starting all services..."
docker-compose up -d

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Health check
print_status "Performing health checks..."
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    print_success "Application is running successfully!"
else
    print_error "Health check failed. Please check the logs."
    docker-compose logs frontend
    exit 1
fi

# Display running services
print_status "Deployment completed! Services status:"
docker-compose ps

echo ""
print_success "🎉 AdyX E-commerce is now running!"
echo ""
echo "📋 Services:"
echo "   • Frontend: http://localhost:3000"
echo "   • Database: localhost:5434"
echo "   • Redis: localhost:6379"
echo ""
echo "🔧 Management commands:"
echo "   • View logs: docker-compose logs -f"
echo "   • Stop services: docker-compose down"
echo "   • Restart: docker-compose restart"
echo "   • Update: ./scripts/deploy.sh"
echo ""
echo "📖 For SSL setup and domain configuration, see:"
echo "   • ./scripts/setup-ssl.sh"
echo "   • ./nginx/nginx.conf"
echo ""

# Optional: Open browser
if command -v open &> /dev/null; then
    print_status "Opening application in browser..."
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    print_status "Opening application in browser..."
    xdg-open http://localhost:3000
fi
