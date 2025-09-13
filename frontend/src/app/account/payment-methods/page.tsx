'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, CreditCard, Shield, Calendar } from 'lucide-react'
import Link from 'next/link'

interface PaymentMethod {
  id: string
  type: 'card' | 'paypal' | 'bank'
  brand?: string
  last4?: string
  expiryMonth?: number
  expiryYear?: number
  holderName: string
  isDefault: boolean
  email?: string // for PayPal
  bankName?: string // for bank transfer
}

export default function PaymentMethodsPage() {
  const { data: session, status } = useSession()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null)

  // Mock payment methods data for demo
  const mockPaymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      brand: 'Visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      holderName: 'Aditya Dasappanavar',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      brand: 'Mastercard',
      last4: '8888',
      expiryMonth: 6,
      expiryYear: 2026,
      holderName: 'Aditya Dasappanavar',
      isDefault: false
    },
    {
      id: '3',
      type: 'paypal',
      email: 'tarab82004@gmail.com',
      holderName: 'Aditya Dasappanavar',
      isDefault: false
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setPaymentMethods(mockPaymentMethods)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-900"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const getPaymentIcon = (method: PaymentMethod) => {
    if (method.type === 'card') {
      return <CreditCard className="h-5 w-5" />
    }
    return <Shield className="h-5 w-5" />
  }

  const getCardBrandColor = (brand?: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return 'from-blue-500 to-blue-600'
      case 'mastercard':
        return 'from-red-500 to-orange-500'
      case 'amex':
        return 'from-green-500 to-green-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const deletePaymentMethod = (methodId: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== methodId))
  }

  const setDefaultPaymentMethod = (methodId: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-900">Payment Methods</h1>
              <p className="text-primary-600 mt-2">
                Manage your saved payment methods for faster checkout
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Payment Method
            </Button>
          </div>
        </div>

        {paymentMethods.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <CreditCard className="h-16 w-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                No payment methods saved
              </h3>
              <p className="text-primary-600 mb-6">
                Add a payment method to speed up your checkout process
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id} className={`relative ${method.isDefault ? 'ring-2 ring-primary-500' : ''}`}>
                <CardContent className="p-6">
                  {method.type === 'card' ? (
                    <div className={`bg-gradient-to-r ${getCardBrandColor(method.brand)} rounded-lg p-4 text-white mb-4`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-sm opacity-90">
                          {method.brand?.toUpperCase()}
                        </div>
                        {method.isDefault && (
                          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-lg font-mono tracking-wider mb-4">
                        •••• •••• •••• {method.last4}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm opacity-90">
                          {method.holderName}
                        </div>
                        <div className="text-sm opacity-90 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {method.expiryMonth?.toString().padStart(2, '0')}/{method.expiryYear}
                        </div>
                      </div>
                    </div>
                  ) : method.type === 'paypal' ? (
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-4 text-white mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-bold">PayPal</div>
                        {method.isDefault && (
                          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm opacity-90 mb-2">{method.email}</div>
                      <div className="text-sm opacity-90">{method.holderName}</div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-4 text-white mb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-bold">Bank Transfer</div>
                        {method.isDefault && (
                          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-sm opacity-90 mb-2">{method.bankName}</div>
                      <div className="text-sm opacity-90">{method.holderName}</div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingMethod(method)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultPaymentMethod(method.id)}
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deletePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Add/Edit Payment Method Form Modal */}
        {(showAddForm || editingMethod) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                  <select
                    id="paymentType"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={editingMethod?.type || 'card'}
                  >
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <Input
                    id="holderName"
                    placeholder="Full name on card"
                    defaultValue={editingMethod?.holderName || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    defaultValue={editingMethod?.last4 ? `****-****-****-${editingMethod.last4}` : ''}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      defaultValue={
                        editingMethod?.expiryMonth && editingMethod?.expiryYear
                          ? `${editingMethod.expiryMonth.toString().padStart(2, '0')}/${editingMethod.expiryYear.toString().slice(-2)}`
                          : ''
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-800 mb-2">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Your payment information is encrypted and secure. We never store your full card details.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1">
                    {editingMethod ? 'Update Payment Method' : 'Save Payment Method'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingMethod(null)
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/account">
            <Button variant="outline">Back to Account</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
