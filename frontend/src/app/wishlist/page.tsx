'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/stores/cart'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
  dateAdded: string
}

export default function WishlistPage() {
  const { data: session, status } = useSession()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { addItem } = useCartStore()

  // Mock wishlist data
  const mockWishlistItems: WishlistItem[] = [
    {
      id: '1',
      name: 'Elegant Black Midi Dress',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop&q=80',
      category: 'Dresses',
      dateAdded: '2024-01-15'
    },
    {
      id: '2',
      name: 'Classic White Blazer',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop&q=80',
      category: 'Blazers',
      dateAdded: '2024-01-10'
    },
    {
      id: '3',
      name: 'Designer Leather Handbag',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=800&fit=crop&q=80',
      category: 'Accessories',
      dateAdded: '2024-01-08'
    },
    {
      id: '4',
      name: 'Silk Scarf Collection',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=800&fit=crop&q=80',
      category: 'Accessories',
      dateAdded: '2024-01-05'
    }
  ]

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      redirect('/auth/signin?callbackUrl=/wishlist')
      return
    }

    // Start with empty wishlist - users need to manually add items
    const timer = setTimeout(() => {
      // To start with empty wishlist, change this to: setWishlistItems([])
      // For demo purposes, keeping some mock data. Remove this in production:
      setWishlistItems([]) // Empty wishlist - users add items manually
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [session, status])

  const handleRemoveFromWishlist = (itemId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId))
  }

  const handleAddToCart = (item: WishlistItem) => {
    addItem({
      productId: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      maxQuantity: 100
    })
    
    // Optionally remove from wishlist after adding to cart
    // handleRemoveFromWishlist(item.id)
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            My Wishlist
          </h1>
          <p className="mt-2 text-gray-600">
            {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                Start adding items you love to your wishlist and they'll appear here.
              </p>
              <Link href="/products">
                <Button>
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Heart className="h-4 w-4 text-red-500 fill-current" />
                    </button>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ${item.price}
                    </span>
                    <span className="text-xs text-gray-500">
                      Added {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-black hover:bg-gray-800 text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="hover:bg-red-50 hover:border-red-200"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <Link href={`/products/${item.id}`}>
                    <Button variant="ghost" className="w-full mt-2 text-sm">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-8 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
