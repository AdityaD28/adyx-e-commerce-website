import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

// Mock data for featured products - will be replaced with actual database calls
const featuredProducts = [
  {
    id: '1',
    name: 'Elegant Black Midi Dress',
    price: 129.99,
    comparePrice: 149.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    href: '/products/elegant-black-midi-dress',
  },
  {
    id: '2',
    name: 'Classic White Button Shirt',
    price: 79.99,
    comparePrice: 99.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop',
    href: '/products/classic-white-button-shirt',
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    price: 159.99,
    comparePrice: 199.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
    href: '/products/leather-crossbody-bag',
  },
  {
    id: '4',
    name: 'Classic Sunglasses',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop',
    href: '/products/classic-sunglasses',
  },
]

const categories = [
  {
    name: 'Women',
    href: '/categories/women',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    description: 'Discover our latest collection',
  },
  {
    name: 'Men',
    href: '/categories/men',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&h=600&fit=crop',
    description: 'Shop premium menswear',
  },
  {
    name: 'Accessories',
    href: '/categories/accessories',
    image: 'https://images.unsplash.com/photo-1506629905607-ce19687bc375?w=800&h=600&fit=crop',
    description: 'Complete your look',
  },
  {
    name: 'Shoes',
    href: '/categories/shoes',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&h=600&fit=crop',
    description: 'Step in style',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-gradient-to-r from-primary-100 to-primary-200">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-900 mb-6 animate-fade-in">
            Discover Your Style
          </h1>
          <p className="text-xl sm:text-2xl text-primary-700 mb-8 max-w-2xl mx-auto animate-slide-up">
            Minimalist fashion that speaks volumes. Premium quality, timeless design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" asChild>
              <Link href="/categories/women">Shop Women</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories/men">Shop Men</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for the modern lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg bg-primary-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-primary-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Handpicked pieces that define contemporary elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
              <Link href={product.href}>
                <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-primary-900">
                      ${product.price}
                    </span>
                    {product.comparePrice && (
                      <span className="text-sm text-primary-500 line-through">
                        ${product.comparePrice}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Be the first to know about new collections, exclusive offers, and style tips
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-primary-900 placeholder-primary-500 focus:outline-none focus:ring-2 focus:ring-accent-500"
              required
            />
            <Button type="submit" className="bg-accent-500 hover:bg-accent-600 text-primary-900">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-primary-300 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
