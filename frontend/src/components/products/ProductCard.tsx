'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getPlaceholderImage } from '@/utils/imageUtils'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating?: number
  reviewCount?: number
  sizes?: string[]
  colors?: string[]
  stock: number
}

interface ProductCardProps {
  product: Product
  variant?: 'default' | 'featured'
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || '')
  const [isLoading, setIsLoading] = useState(false)
  const { addItem, toggleCart } = useCartStore()

  // Simple fallback image function
  const getImageSrc = () => {
    // Always use the product image directly
    return product.image || getPlaceholderImage(product.category, 400, 600)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleAddToCart = async () => {
    setIsLoading(true)
    
    // Add item to cart
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: getImageSrc(), // Use the same image source as display
      size: selectedSize || product.sizes?.[0],
      color: selectedColor || product.colors?.[0],
      maxQuantity: product.stock
    })

    // Show cart sidebar
    setTimeout(() => {
      toggleCart()
      setIsLoading(false)
    }, 300)
  }

  const isOutOfStock = product.stock === 0

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <div className="aspect-[3/4] relative bg-gray-100 overflow-hidden">
            {getImageSrc().startsWith('/images/') ? (
              <img
                src={getImageSrc()}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = getPlaceholderImage(product.category, 400, 600)
                }}
              />
            ) : (
              <Image
                src={getImageSrc()}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={variant === 'featured'}
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  // Use local category placeholder as final fallback
                  target.src = getPlaceholderImage(product.category, 400, 600)
                }}
              />
            )}
          </div>
        </Link>
        
        {/* Quick actions */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleAddToCart}
            disabled={isOutOfStock || isLoading}
            className="w-full"
            size="sm"
          >
            {isLoading ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Link 
            href={`/products/${product.id}`}
            className="block hover:text-primary-800 transition-colors"
          >
            <h3 className="font-medium text-primary-900 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <p className="text-sm text-primary-600 capitalize">
            {product.category}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Size and Color options */}
          {(product.sizes || product.colors) && (
            <div className="space-y-2">
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Size:</p>
                  <div className="flex gap-1">
                    {product.sizes.slice(0, 3).map((size) => (
                      <button
                        key={size}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedSize(selectedSize === size ? '' : size)
                        }}
                        className={`text-xs px-2 py-1 border rounded transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                    {product.sizes.length > 3 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{product.sizes.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div>
                  <p className="text-xs text-gray-600 mb-1">Color:</p>
                  <div className="flex gap-1">
                    {product.colors.slice(0, 4).map((color) => (
                      <button
                        key={color}
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setSelectedColor(selectedColor === color ? '' : color)
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? 'border-black ring-2 ring-black ring-offset-1'
                            : 'border-gray-300 hover:border-gray-500'
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-gray-500 flex items-center px-1">
                        +{product.colors.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <span className="font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
