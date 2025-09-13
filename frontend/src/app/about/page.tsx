import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center mb-8">
          <Button variant="ghost">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About AdyX</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the story behind our passion for minimalist fashion and premium quality clothing
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 mb-16 rounded-lg overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/Hero.jpg")'
            }}
          />
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Minimalist Fashion That Speaks Volumes</h2>
              <p className="text-lg">Premium quality, timeless design</p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Founded with a vision to revolutionize fashion through minimalist design, AdyX represents 
                  the perfect balance between style and substance. We believe that true elegance lies in simplicity.
                </p>
                <p>
                  Our journey began with a simple idea: create clothing that transcends trends and seasons, 
                  pieces that you'll love wearing for years to come.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                To provide high-quality, sustainably-made fashion that empowers individuals to express 
                their authentic selves through timeless, versatile pieces.
              </p>
            </section>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
                  <p className="text-gray-700">Every piece is crafted with meticulous attention to detail and premium materials.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainable Fashion</h3>
                  <p className="text-gray-700">We're committed to ethical manufacturing and sustainable practices.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Timeless Design</h3>
                  <p className="text-gray-700">Our designs focus on versatility and longevity, not fleeting trends.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Premium Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">99%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Discover Your Style?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore our collections and find the perfect pieces to elevate your wardrobe.
          </p>
          <div className="space-x-4">
            <Link href="/categories/women">
              <Button size="lg">Shop Women</Button>
            </Link>
            <Link href="/categories/men">
              <Button size="lg" variant="outline">Shop Men</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
