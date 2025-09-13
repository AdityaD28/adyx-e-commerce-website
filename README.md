# AdyX - Modern E-commerce Platform

A full-stack e-commerce platform built with Next.js 15, featuring a complete shopping experience with authentication, cart management, and Stripe payment integration.

## Features

### Core Functionality
- Product catalog with categories (Men, Women, Accessories)
- Shopping cart with persistent storage
- User authentication (sign up, sign in, sign out)
- Secure checkout with Stripe integration
- Order management system
- Responsive design for all devices

### Product Management
- Comprehensive product database
- Product variants (sizes, colors)
- High-quality product images
- Product filtering and search
- Category-based navigation

### User Experience
- Modern, clean interface inspired by ZARA
- Real-time cart updates
- Form validation
- Loading states and error handling
- Mobile-responsive design

### Payment & Security
- Stripe payment processing
- Secure user authentication with NextAuth.js
- Environment-based configuration
- Error handling and validation

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management for cart
- **React Hook Form** - Form handling and validation

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **NextAuth.js** - Authentication system

### Payment & Services
- **Stripe** - Payment processing
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **Turbopack** - Fast development builds
- **Docker** - Database containerization

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Docker (for database)
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-commerce-website
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables in .env.local**
   ```bash
   # Database
   DATABASE_URL="postgresql://postgres:postgres@localhost:5434/adyx_ecommerce"

   # NextAuth.js
   NEXTAUTH_SECRET="your-super-secret-key-min-32-chars-long"
   NEXTAUTH_URL="http://localhost:3000"

   # Stripe
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   ```

5. **Start the database**
   ```bash
   docker start adyx-postgres
   # Or create new container:
   docker run --name adyx-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=adyx_ecommerce -p 5434:5432 -d postgres:15
   ```

6. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:3000
   - Database: PostgreSQL on localhost:5434

## Project Structure

```
E-commerce-website/
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js app directory
│   │   │   ├── api/            # API routes
│   │   │   ├── auth/           # Authentication pages
│   │   │   ├── categories/     # Category pages
│   │   │   ├── checkout/       # Checkout flow
│   │   │   └── products/       # Product pages
│   │   ├── components/         # Reusable components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── cart/          # Shopping cart components
│   │   │   ├── products/      # Product components
│   │   │   └── ui/            # UI components
│   │   ├── data/              # Static data and product catalog
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility libraries
│   │   ├── stores/            # Zustand stores
│   │   └── utils/             # Utility functions
│   ├── public/
│   │   └── images/            # Product images and assets
│   ├── prisma/               # Database schema and migrations
│   └── package.json
└── backend/                  # Backend configuration and database
```

## Key Components

### Authentication System
- User registration and login
- Password hashing with bcryptjs
- Session management with NextAuth.js
- Protected routes and middleware

### Shopping Cart
- Persistent cart state with Zustand
- Local storage synchronization
- Real-time updates
- Quantity management
- Product variants support

### Product Catalog
- Comprehensive product database
- Category-based organization
- Product variants (size, color)
- High-quality images
- Search and filtering capabilities

### Checkout System
- Multi-step checkout process
- Address and billing information
- Stripe payment integration
- Order confirmation
- Error handling

## Database Schema

### Core Models
- **User** - Customer accounts and authentication
- **Product** - Product catalog with variants
- **Order** - Order management and history
- **CartItem** - Shopping cart persistence

### Key Features
- Prisma ORM for type-safe database operations
- PostgreSQL for reliable data storage
- Automatic migrations and schema updates

## Payment Integration

### Stripe Configuration
- Test and production environment support
- Secure payment processing
- Webhook handling for order updates
- Comprehensive error handling

### Supported Features
- Credit card payments
- Multiple currencies (USD primary)
- Tax calculation
- Shipping cost calculation
- Order confirmation emails

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:studio    # Open Prisma Studio
```

### Environment Configuration
- Development: Uses .env.local
- Production: Configure environment variables on hosting platform
- Database: PostgreSQL connection string
- Payments: Stripe API keys

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signout` - User sign out

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/[id]` - Get single product

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

### Stripe
- `POST /api/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## Deployment

### Prerequisites
- Node.js hosting platform (Vercel, Netlify, etc.)
- PostgreSQL database (Supabase, Railway, etc.)
- Environment variables configured

### Build Process
1. Install dependencies
2. Generate Prisma client
3. Build Next.js application
4. Deploy to hosting platform

### Environment Variables
Ensure all required environment variables are set:
- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

## Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use ESLint configuration
3. Write descriptive commit messages
4. Test all functionality before commits
5. Maintain responsive design principles

### Code Style
- Use TypeScript for type safety
- Follow Next.js conventions
- Implement proper error handling
- Use semantic HTML elements
- Follow accessibility guidelines

## Troubleshooting

### Common Issues

**Database Connection Issues**
- Ensure PostgreSQL is running
- Check DATABASE_URL in .env.local
- Run `npx prisma generate` after schema changes

**Stripe Payment Errors**
- Verify Stripe API keys are correct
- Check webhook configuration
- Ensure HTTPS in production

**Build Errors**
- Clear .next directory
- Reinstall node_modules
- Check TypeScript errors

### Performance Tips
- Images are optimized with Next.js Image component
- Code splitting with dynamic imports
- Database queries optimized with Prisma
- Static generation where possible

## Security Features

- **Authentication**: Secure session management with NextAuth.js
- **Authorization**: Role-based access control
- **Data Protection**: Input validation and sanitization
- **Password Security**: bcryptjs hashing
- **Environment Variables**: Secure configuration management

## Performance Optimizations

- **Next.js Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Efficient caching strategies
- **Database**: Optimized queries with Prisma
- **Build Optimization**: Turbopack for fast development builds

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the repository or contact the development team.

## Acknowledgments

- Next.js team for the excellent framework
- Stripe for payment processing
- Prisma for database management
- Tailwind CSS for styling system
- All contributors to the open-source libraries used
