'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { getStripe } from '@/lib/stripe'

interface CheckoutForm {
  email: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export default function CheckoutPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const { items, getTotalPrice, getTotalItems, clearCart } = useCartStore()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState<CheckoutForm>({
    email: session?.user?.email || '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  })

  useEffect(() => {
    if (items.length === 0) {
      router.push('/products')
    }
  }, [items, router])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const calculateTax = () => {
    return getTotalPrice() * 0.08 // 8% tax
  }

  const calculateShipping = () => {
    return getTotalPrice() > 100 ? 0 : 9.99 // Free shipping over $100
  }

  const calculateTotal = () => {
    return getTotalPrice() + calculateTax() + calculateShipping()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
          })),
          customerInfo: form,
          userId: session?.user?.id
        })
      })

      const { sessionId, error: checkoutError } = await response.json()

      if (checkoutError) {
        setError(checkoutError)
        setIsLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe()
      const { error: stripeError } = await stripe!.redirectToCheckout({
        sessionId
      })

      if (stripeError) {
        setError(stripeError.message || 'An error occurred')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-primary-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Checkout</h1>
          <p className="text-primary-600 mt-2">
            Complete your order below
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                      disabled={!!session?.user?.email}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        First Name
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        Last Name
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary-700 mb-1">
                      Address
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        City
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        State
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={form.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        ZIP Code
                      </label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary-700 mb-1">
                        Country
                      </label>
                      <Input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processing...' : `Pay ${formatPrice(calculateTotal())}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary ({getTotalItems()} items)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Items */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex space-x-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-primary-900">
                          {item.name}
                        </h4>
                        <div className="text-sm text-primary-600">
                          {item.size && <span>Size: {item.size}</span>}
                          {item.color && <span className="ml-2">Color: {item.color}</span>}
                        </div>
                        <div className="text-sm text-primary-600">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-sm font-medium text-primary-900">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="border-primary-200" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Subtotal</span>
                    <span className="text-primary-900">{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Shipping</span>
                    <span className="text-primary-900">
                      {calculateShipping() === 0 ? 'FREE' : formatPrice(calculateShipping())}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-primary-600">Tax</span>
                    <span className="text-primary-900">{formatPrice(calculateTax())}</span>
                  </div>
                  <hr className="border-primary-200" />
                  <div className="flex justify-between font-medium text-lg">
                    <span className="text-primary-900">Total</span>
                    <span className="text-primary-900">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
