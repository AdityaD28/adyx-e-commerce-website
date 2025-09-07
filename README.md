# AdyX E-commerce Platform

A modern, production-ready e-commerce website inspired by ZARA's minimalist design. Built with Next.js, TypeScript, Tailwind CSS, PostgreSQL, and Stripe payments.

## 🌟 Features

- **Modern Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Secure Payments**: Stripe integration with webhook support
- **Admin Dashboard**: Complete product and order management
- **Authentication**: NextAuth.js with customer and admin roles
- **Database**: PostgreSQL with Prisma ORM
- **Search & Filters**: Product search with category and price filters
- **Responsive Design**: Mobile-first responsive design
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance**: Image optimization and lazy loading
- **Accessibility**: ARIA attributes and keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database
- Stripe account for payments

### 1. Clone and Install

```bash
git clone <repository-url>
cd adyx-ecommerce
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env.local
```

Fill in your environment variables (see Configuration section below).

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed with sample data
npm run seed
```

### 4. Start Development

```bash
npm run dev
```

Visit http://localhost:3000 to see your application.

## 📁 Project Structure

```
adyx-ecommerce/
├── frontend/           # Next.js frontend application
│   ├── app/           # App router pages and layouts
│   ├── components/    # Reusable React components
│   ├── lib/          # Utility functions and configurations
│   └── public/       # Static assets
├── backend/          # Express.js API server (if needed)
├── db/              # Database schema and migrations
│   ├── prisma/      # Prisma schema and migrations
│   └── seed.ts      # Database seeding script
├── infra/           # Docker and deployment configs
└── scripts/         # Build and deployment scripts
```

## ⚙️ Configuration

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/adyx_ecommerce"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (SendGrid)
SENDGRID_API_KEY="SG...."
FROM_EMAIL="noreply@adyx.com"

# Admin
ADMIN_EMAIL="admin@adyx.com"
ADMIN_PASSWORD="secure_password_here"
```

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Set up webhooks for your application:
   - Endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `payment_intent.succeeded`

### Email Setup (SendGrid)

1. Create a SendGrid account
2. Generate an API key
3. Verify your sender email domain

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run seed` - Seed database with sample data

### Creating an Admin User

After seeding the database, you can log in with the admin credentials defined in your environment variables.

### Testing Payments

Use Stripe's test card numbers:
- Successful payment: `4242 4242 4242 4242`
- Declined payment: `4000 0000 0000 0002`

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment

1. Build the application: `npm run build`
2. Set up PostgreSQL database
3. Configure environment variables
4. Start the application: `npm run start`

## 📚 API Documentation

API documentation is available at `/api/docs` when running in development mode.

### Key Endpoints

- `POST /api/auth/*` - Authentication endpoints
- `GET /api/products` - Product listing with filters
- `POST /api/checkout/create-session` - Create Stripe checkout session
- `POST /api/webhooks/stripe` - Stripe webhook handler
- `GET /api/admin/*` - Admin panel endpoints

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📋 TODO

- [ ] Implement advanced search with Algolia
- [ ] Add product reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add multi-language support
- [ ] Set up analytics tracking
- [ ] Implement advanced inventory management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@adyx.com or create an issue in the GitHub repository.
