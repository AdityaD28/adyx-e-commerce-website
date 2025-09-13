'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
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
  const [isRedirecting, setIsRedirecting] = useState(false)
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
    if (items.length === 0 && !isRedirecting) {
      router.push('/products')
    }
  }, [items, router, isRedirecting])

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
            image: item.image,
            size: item.size,
            color: item.color
          })),
          customerInfo: form,
          userId: session?.user?.id
        })
      })

      const data = await response.json()
      const { sessionId, mockMode, realPayment, setupRequired, error: checkoutError, instructions } = data

      if (checkoutError) {
        if (setupRequired) {
          setError(`${checkoutError}\n\nTo enable real payments:\n1. ${instructions.step1}\n2. ${instructions.step2}\n3. ${instructions.step3}\n4. ${instructions.step4}`)
        } else {
          setError(checkoutError)
        }
        setIsLoading(false)
        return
      }

      // Handle mock mode (when Stripe is not configured)
      if (mockMode) {
        console.log('Mock payment completed')
        
        // Set redirecting state to prevent cart emptiness interference
        setIsRedirecting(true)
        
        // Clear cart and redirect to success page
        clearCart()
        router.push('/checkout/success?mock=true')
        return
      }

      // Handle real payment
      if (realPayment && sessionId) {
        console.log('Redirecting to Stripe Checkout for real payment...')
        
        // Get Stripe instance
        const stripe = await getStripe()
        if (!stripe) {
          setError('Payment system unavailable. Please try again.')
          setIsLoading(false)
          return
        }

        // Redirect to Stripe Checkout
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId
        })

        if (stripeError) {
          setError(`Payment error: ${stripeError.message}`)
          setIsLoading(false)
        }
        
        // Note: If successful, user will be redirected to Stripe and then back to success page
        // No need to clear cart here as it will be handled on the success page
        return
      }

      // Fallback error
      setError('Unknown payment processing error')
      setIsLoading(false)

    } catch (error) {
      console.error('Payment error:', error)
      setError('Network error. Please check your connection and try again.')
      setIsLoading(false)
    }
  }

  if (items.length === 0 && !isRedirecting) {
    return (
      <div className="min-h-screen bg-primary-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">Cart is Empty</h1>
          <p className="text-primary-600 mb-6">Add some products to your cart to proceed with checkout.</p>
          <Link href="/products">
            <button className="cart-button-force" style={{
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
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
            }}>
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    )
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
                      <div className="font-medium mb-2">Payment Setup Required</div>
                      <div className="text-sm whitespace-pre-line">{error}</div>
                      {error.includes('set up Stripe') && (
                        <div className="mt-3 text-sm">
                          <p className="font-medium">Quick Setup Guide:</p>
                          <ol className="list-decimal list-inside mt-1 space-y-1">
                            <li>Visit <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">stripe.com</a> and create an account</li>
                            <li>Go to Dashboard → Developers → API keys</li>
                            <li>Copy your test keys to the .env.local file</li>
                            <li>Restart the development server</li>
                          </ol>
                        </div>
                      )}
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full cart-button-force"
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
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      width: '100%',
                      textAlign: 'center',
                      opacity: isLoading ? 0.6 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (isLoading) return
                      e.currentTarget.style.backgroundColor = '#374151'
                    }}
                    onMouseLeave={(e) => {
                      if (isLoading) return
                      e.currentTarget.style.backgroundColor = '#000000'
                    }}
                  >
                    {isLoading ? 'Processing...' : `Pay ${formatPrice(calculateTotal())}`}
                  </button>
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
