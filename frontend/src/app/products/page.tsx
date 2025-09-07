'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

// Mock data - will be replaced with actual database calls
const products = [
  {
    id: '1',
    name: 'Elegant Black Midi Dress',
    price: 129.99,
    comparePrice: 149.99,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black'],
    inStock: true,
  },
  {
    id: '2',
    name: 'Classic White Button Shirt',
    price: 79.99,
    comparePrice: 99.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=800&fit=crop',
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue'],
    inStock: true,
  },
  {
    id: '3',
    name: 'Leather Crossbody Bag',
    price: 159.99,
    comparePrice: 199.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Brown', 'Black'],
    inStock: true,
  },
  {
    id: '4',
    name: 'Classic Sunglasses',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=800&fit=crop',
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Tortoise'],
    inStock: true,
  },
  {
    id: '5',
    name: 'Floral Summer Dress',
    price: 89.99,
    comparePrice: 109.99,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
    category: 'women',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Floral'],
    inStock: true,
  },
  {
    id: '6',
    name: 'Casual Denim Shirt',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3ccf?w=600&h=800&fit=crop',
    category: 'men',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blue', 'Light Blue'],
    inStock: true,
  },
]

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'women', label: 'Women' },
  { value: 'men', label: 'Men' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'shoes', label: 'Shoes' },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'name', label: 'Name: A to Z' },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState({ min: '', max: '' })
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      const matchesPrice = 
        (!priceRange.min || product.price >= Number(priceRange.min)) &&
        (!priceRange.max || product.price <= Number(priceRange.max))
      
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'name':
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 mb-4">
            All Products
          </h1>
          <p className="text-lg text-primary-600">
            Discover our complete collection of premium fashion and accessories
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full max-w-md"
            />
          </div>

          {/* Filter Toggle and Sort */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 w-fit"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </Button>

            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-600">
                {filteredProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-md border border-primary-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full rounded-md border border-primary-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCategory('all')
                      setPriceRange({ min: '', max: '' })
                      setSearchQuery('')
                    }}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-primary-600 mb-4">
              No products found matching your criteria.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all')
                setPriceRange({ min: '', max: '' })
                setSearchQuery('')
              }}
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.comparePrice && (
                      <div className="absolute top-2 left-2 bg-accent-500 text-primary-900 px-2 py-1 rounded text-xs font-medium">
                        Sale
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-primary-900">
                        ${product.price}
                      </span>
                      {product.comparePrice && (
                        <span className="text-sm text-primary-500 line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        {product.colors.map((color, index) => (
                          <div
                            key={color}
                            className="w-4 h-4 rounded-full border border-primary-300"
                            style={{
                              backgroundColor: color.toLowerCase() === 'white' ? '#fff' :
                                             color.toLowerCase() === 'black' ? '#000' :
                                             color.toLowerCase() === 'blue' ? '#3b82f6' :
                                             color.toLowerCase() === 'brown' ? '#a16207' :
                                             color.toLowerCase() === 'tortoise' ? '#a16207' :
                                             '#e5e7eb'
                            }}
                            title={color}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-primary-600">
                        {product.colors.length} color{product.colors.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {/* Load More / Pagination */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
