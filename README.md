# AdyX E-commerce - README

A modern, production-ready e-commerce platform built with Next.js, inspired by ZARA's design philosophy.

## 🚀 Features

### Core E-commerce Features
- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Persistent cart with quantity management
- **Secure Checkout**: Stripe integration for payment processing
- **User Authentication**: Sign up, sign in, and profile management
- **Order Management**: Complete order tracking and history
- **Admin Panel**: Comprehensive product and order management

### Technical Features
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with role-based access
- **Payments**: Stripe integration with webhooks
- **State Management**: Zustand for cart persistence
- **Responsive Design**: Mobile-first approach
- **Production Ready**: Docker deployment with SSL support

## �️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Headless UI
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **State Management**: Zustand
- **Deployment**: Docker, Nginx, Let's Encrypt
- **Development**: Turbopack, ESLint

## � Project Structure

```
adyx-ecommerce/
├── frontend/                 # Next.js application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   ├── lib/             # Utility functions
│   │   └── stores/          # Zustand stores
│   ├── prisma/              # Database schema and migrations
│   └── public/              # Static assets
├── scripts/                 # Deployment and management scripts
├── nginx/                   # Nginx configuration
├── docker-compose.yml       # Docker services
├── Dockerfile              # Application container
└── DEPLOYMENT.md           # Detailed deployment guide
```

## 🚀 Quick Start

### Development Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd adyx-ecommerce
   ```

2. **Start the database**:
   ```bash
   docker-compose up -d postgres redis
   ```

3. **Setup the frontend**:
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Setup the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3001](http://localhost:3001) to see the application.

### Production Deployment

For production deployment, see the detailed [DEPLOYMENT.md](./DEPLOYMENT.md) guide.

Quick production start:
```bash
# Copy and configure environment
cp .env.production.example .env.production
# Edit .env.production with your values

# Deploy with Docker
./scripts/deploy.sh
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for development or `.env.production` for production:

```bash
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/adyx_ecommerce"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3001"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

### Database Configuration

The application uses PostgreSQL with Prisma. Key commands:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

## 📱 Features Overview

### Customer Features
- **Homepage**: Hero section, featured products, categories
- **Product Catalog**: Grid/list view, filters, search, pagination
- **Product Details**: Image gallery, size/color selection, reviews
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Guest/registered checkout, Stripe payment
- **User Account**: Profile management, order history
- **Authentication**: Sign up, sign in, password reset

### Admin Features
- **Dashboard**: Sales overview, analytics, quick stats
- **Product Management**: CRUD operations, inventory tracking
- **Order Management**: Order processing, status updates
- **User Management**: Customer overview, role management
- **Analytics**: Sales reports, popular products

### Technical Features
- **Responsive Design**: Works on all devices
- **Performance**: Optimized images, caching, lazy loading
- **Security**: HTTPS, CSP headers, input validation
- **SEO**: Meta tags, structured data, sitemap
- **Monitoring**: Health checks, error tracking
- **Scalability**: Horizontal scaling ready

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000) - Main brand color
- **Secondary**: White (#FFFFFF) - Background and contrast
- **Accent**: Gray tones for text and borders
- **Interactive**: Hover states and active elements

### Typography
- **Headings**: Bold, clean sans-serif
- **Body**: Readable font with proper line height
- **Buttons**: Consistent styling across the platform

### Components
- **Buttons**: Primary, secondary, outline variants
- **Forms**: Clean inputs with validation states
- **Cards**: Product cards, info cards
- **Navigation**: Header, footer, breadcrumbs

## 🔒 Security

- **Authentication**: Secure session management
- **Authorization**: Role-based access control
- **Data Protection**: Input validation, sanitization
- **HTTPS**: SSL/TLS encryption
- **Rate Limiting**: API endpoint protection
- **Security Headers**: XSS, CSRF protection

## 📊 Performance

- **Core Web Vitals**: Optimized for Google's metrics
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Caching**: Redis for sessions, CDN for static assets
- **Database**: Optimized queries with Prisma

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e
```

## � API Documentation

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User sign out

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get single order

### Stripe
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions

## 🗺️ Roadmap

### Phase 1 (Completed) ✅
- [x] Basic e-commerce functionality
- [x] User authentication
- [x] Shopping cart
- [x] Stripe integration
- [x] Admin panel
- [x] Docker deployment

### Phase 2 (Future)
- [ ] Advanced search with Elasticsearch
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Inventory management
- [ ] Multi-language support
- [ ] Social authentication
- [ ] Progressive Web App (PWA)

### Phase 3 (Future)
- [ ] Multi-vendor support
- [ ] Advanced analytics
- [ ] AI-powered recommendations
- [ ] Mobile app
- [ ] International shipping
- [ ] Subscription products

## � Acknowledgments

- Design inspiration from ZARA
- Built with amazing open-source technologies
- Community feedback and contributions

---

**AdyX E-commerce** - Building the future of online retail 🛍️
