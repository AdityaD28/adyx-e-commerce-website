import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProductCard from '@/components/products/ProductCard'
import { getFeaturedProducts } from '@/data/products'

// Get featured products from centralized database
const featuredProducts = getFeaturedProducts()

const categories = [
  {
    name: 'Women',
    href: '/categories/women',
    image: '/images/products/1/Elegant Black Midi Dress.jpg',
    description: 'Discover our latest collection',
  },
  {
    name: 'Men',
    href: '/categories/men',
    image: '/images/products/21/Slim Fit Chinos .jpg',
    description: 'Shop premium menswear',
  },
  {
    name: 'Accessories',
    href: '/categories/accessories',
    image: '/images/products/31/Leather Belt .jpg',
    description: 'Complete your look',
  },
  {
    name: 'Shoes',
    href: '/categories/shoes',
    image: '/images/products/41/Running Sneakers .jpg',
    description: 'Step in style',
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/Hero.jpg"
            alt="Fashion hero background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        {/* Subtle overlay for enhanced text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/20"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in drop-shadow-2xl">
            Discover Your Style
          </h1>
          <p className="text-xl sm:text-2xl text-white/95 mb-8 max-w-2xl mx-auto animate-slide-up drop-shadow-lg font-light">
            Minimalist fashion that speaks volumes. Premium quality, timeless design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
              <Link href="/categories/women">Shop Women</Link>
            </Button>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 border-0 backdrop-blur-sm shadow-xl hover:shadow-2xl font-semibold transition-all duration-300 transform hover:scale-105" asChild>
              <Link href="/categories/men">Shop Men</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for the modern lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-all duration-300"
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked pieces that define contemporary elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} variant="featured" />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new collections, exclusive offers, and style tips
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Button type="submit" className="bg-white text-gray-900 hover:bg-gray-100">
              Subscribe
            </Button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            No spam, unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  )
}
