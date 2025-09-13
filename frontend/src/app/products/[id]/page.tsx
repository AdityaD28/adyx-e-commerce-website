'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getProductById, Product } from '@/data/products'
import { useCartStore } from '@/stores/cart'
import { 
  ArrowLeftIcon, 
  StarIcon, 
  HeartIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { addItem, toggleCart } = useCartStore()

  useEffect(() => {
    // Get product from centralized database
    const foundProduct = getProductById(productId)
    
    if (foundProduct) {
      setProduct(foundProduct)
      if (foundProduct.sizes?.length) {
        setSelectedSize(foundProduct.sizes[0])
      }
      if (foundProduct.colors?.length) {
        setSelectedColor(foundProduct.colors[0])
      }
    }
  }, [productId])

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted)
    
    // Show feedback to user
    if (!isWishlisted) {
      alert('Added to wishlist! 💖')
    } else {
      alert('Removed from wishlist')
    }
  }

  const handleAddToCart = async () => {
    if (!product) return
    
    setIsLoading(true)
    
    // Add item to cart
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image, // Use the main product image
      size: selectedSize,
      color: selectedColor,
      maxQuantity: product.stock,
      quantity
    })

    // Show cart sidebar
    setTimeout(() => {
      toggleCart()
      setIsLoading(false)
    }, 300)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    // In a real app, redirect to checkout
    router.push('/checkout')
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/categories/${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                  {discount}% OFF
                </Badge>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square relative bg-gray-100 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-primary-600' : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-primary-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-gray-500 hover:bg-gray-50 transition-all font-medium"
                >
                  −
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:border-gray-500 hover:bg-gray-50 transition-all font-medium"
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                {/* Custom cart button with maximum visibility */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || isLoading}
                  className="flex-1 cart-button-force"
                  style={{
                    backgroundColor: '#000000',
                    color: '#ffffff',
                    border: '3px solid #000000',
                    borderRadius: '6px',
                    padding: '16px 32px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    minHeight: '56px',
                    cursor: product.stock === 0 || isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    opacity: product.stock === 0 || isLoading ? 0.6 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!product.stock || isLoading) return
                    e.currentTarget.style.backgroundColor = '#374151'
                  }}
                  onMouseLeave={(e) => {
                    if (!product.stock || isLoading) return
                    e.currentTarget.style.backgroundColor = '#000000'
                  }}
                >
                  {isLoading ? 'Adding...' : 'Add to Cart'}
                </button>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={handleWishlistToggle}
                    size="lg"
                    className="px-4 border-gray-300 hover:border-gray-400"
                    title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    {isWishlisted ? (
                      <HeartSolidIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5 text-gray-700" />
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="px-4 border-gray-300 hover:border-gray-400"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-700" />
                  </Button>
                </div>
              </div>
              
              <Button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                variant="outline"
                className="w-full border-gray-300 text-gray-900 hover:bg-gray-50 hover:border-gray-400"
                size="lg"
              >
                Buy Now
              </Button>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3">
                  <TruckIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">2-year warranty included</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm border-primary-600 text-primary-600">
                Details
              </button>
            </nav>
          </div>
          
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Product Features</h4>
                <ul className="space-y-2">
                  {product.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Specifications</h4>
                <dl className="space-y-2">
                  {Object.entries(product.details || {}).map(([key, value]) => (
                    <div key={key} className="flex">
                      <dt className="text-gray-600 capitalize w-24">{key}:</dt>
                      <dd className="text-gray-900 font-medium">{value as string}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
