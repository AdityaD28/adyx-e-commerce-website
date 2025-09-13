'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/products/ProductCard'

// Mock data for men's products  
const mockProducts = [
  {
    id: '21',
    name: 'Classic Oxford Shirt',
    price: 69.99,
    image: 'https://picsum.photos/400/600?random=21',
    category: 'men',
    rating: 4.5,
    reviewCount: 67,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Light Gray'],
    stock: 40,
    subcategory: 'Shirts'
  },
  {
    id: '22',
    name: 'Leather Bomber Jacket',
    price: 199.99,
    originalPrice: 249.99,
    image: 'https://picsum.photos/400/600?random=22',
    category: 'men',
    rating: 4.7,
    reviewCount: 45,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    stock: 25,
    subcategory: 'Outerwear'
  },
  {
    id: '23',
    name: 'Slim Fit Chinos',
    price: 79.99,
    image: 'https://picsum.photos/400/600?random=23',
    category: 'men',
    rating: 4.3,
    reviewCount: 89,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Khaki', 'Navy', 'Black'],
    stock: 60,
    subcategory: 'Pants'
  },
  {
    id: '24',
    name: 'Merino Wool Sweater',
    price: 119.99,
    image: 'https://picsum.photos/400/600?random=24',
    category: 'men',
    rating: 4.6,
    reviewCount: 78,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Gray', 'Burgundy'],
    stock: 35,
    subcategory: 'Sweaters'
  },
  {
    id: '25',
    name: 'Denim Jeans',
    price: 89.99,
    image: 'https://picsum.photos/400/600?random=25',
    category: 'men',
    rating: 4.4,
    reviewCount: 123,
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Dark Blue', 'Light Blue', 'Black'],
    stock: 55,
    subcategory: 'Pants'
  },
  {
    id: '26',
    name: 'Blazer Suit Jacket',
    price: 159.99,
    originalPrice: 199.99,
    image: 'https://picsum.photos/400/600?random=26',
    category: 'men',
    rating: 4.8,
    reviewCount: 34,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Navy', 'Charcoal', 'Black'],
    stock: 20,
    subcategory: 'Outerwear'
  }
]

const categories = ['All', 'Shirts', 'Pants', 'Outerwear', 'Sweaters']

export default function MenPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProducts, setFilteredProducts] = useState(mockProducts)

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(mockProducts)
    } else {
      setFilteredProducts(mockProducts.filter(product => product.subcategory === selectedCategory))
    }
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://picsum.photos/1200/400?random=men")'
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Men's Collection</h1>
          <p className="text-xl">Discover premium quality and timeless style</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-900 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
