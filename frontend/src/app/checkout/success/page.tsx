'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

interface OrderDetails {
  id: string
  total: number
  status: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
}

export default function CheckoutSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCartStore()

  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (!sessionId) {
      router.push('/')
      return
    }

    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/checkout/success?session_id=${sessionId}`)
        const data = await response.json()

        if (data.success) {
          setOrderDetails(data.order)
          clearCart() // Clear the cart after successful payment
        } else {
          router.push('/checkout')
        }
      } catch (error) {
        console.error('Error fetching order details:', error)
        router.push('/checkout')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrderDetails()
  }, [sessionId, router, clearCart])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-900"></div>
      </div>
    )
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-primary-600 mb-6">
              There was an issue processing your payment.
            </p>
            <Link href="/checkout">
              <Button>Try Again</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary-900 mb-2">Order Confirmed!</h1>
          <p className="text-primary-600">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="border-b border-primary-200 pb-4 mb-4">
              <h2 className="text-lg font-semibold text-primary-900 mb-2">
                Order Details
              </h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-primary-600">Order Number:</span>
                  <p className="font-medium text-primary-900">#{orderDetails.id}</p>
                </div>
                <div>
                  <span className="text-primary-600">Status:</span>
                  <p className="font-medium text-primary-900 capitalize">{orderDetails.status}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-primary-900">Items Ordered</h3>
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium text-primary-900">{item.name}</p>
                    <p className="text-sm text-primary-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-primary-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              
              <div className="border-t border-primary-200 pt-4">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-lg text-primary-900">Total</p>
                  <p className="font-semibold text-lg text-primary-900">
                    {formatPrice(orderDetails.total)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <p className="text-primary-600">
            You will receive an email confirmation shortly with tracking information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/account/orders">
              <Button variant="outline">View Orders</Button>
            </Link>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
