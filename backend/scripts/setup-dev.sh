#!/bin/bash

# AdyX E-commerce Development Setup Script
# This script sets up the local development environment

set -e

echo "🚀 Setting up AdyX E-commerce development environment..."

# Check if required tools are installed
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm is not installed. Please install npm first."
        exit 1
    fi
    
    if ! command -v docker &> /dev/null; then
        echo "⚠️  Docker is not installed. You can still run without Docker, but some features may be limited."
    fi
    
    echo "✅ Requirements check passed!"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    
    # Root dependencies
    npm install
    
    # Frontend dependencies
    cd frontend && npm install && cd ..
    
    # Database dependencies
    cd db && npm install && cd ..
    
    echo "✅ Dependencies installed!"
}

# Setup environment variables
setup_env() {
    echo "⚙️  Setting up environment variables..."
    
    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
        echo "📝 Created .env.local from template."
        echo "⚠️  Please edit .env.local with your actual configuration values."
    else
        echo "✅ .env.local already exists."
    fi
}

# Setup database
setup_database() {
    echo "🗄️  Setting up database..."
    
    if command -v docker &> /dev/null; then
        echo "🐳 Starting PostgreSQL with Docker..."
        cd infra && docker-compose up -d postgres && cd ..
        
        # Wait for database to be ready
        echo "⏳ Waiting for database to be ready..."
        sleep 10
        
        # Run migrations
        echo "🔄 Running database migrations..."
        cd db && npx prisma migrate dev --name init && cd ..
        
        # Generate Prisma client
        echo "🔧 Generating Prisma client..."
        cd db && npx prisma generate && cd ..
        
        # Seed database
        echo "🌱 Seeding database..."
        cd db && npm run seed && cd ..
        
        echo "✅ Database setup complete!"
    else
        echo "⚠️  Docker not available. Please set up PostgreSQL manually and update DATABASE_URL in .env.local"
        echo "📖 Refer to README.md for manual database setup instructions."
    fi
}

# Main setup flow
main() {
    check_requirements
    install_dependencies
    setup_env
    setup_database
    
    echo "🎉 Setup complete!"
    echo ""
    echo "📚 Next steps:"
    echo "1. Edit .env.local with your configuration values"
    echo "2. Run 'npm run dev' to start the development server"
    echo "3. Visit http://localhost:3000 to see your application"
    echo ""
    echo "📖 For more information, see README.md"
}

# Run main function
main
