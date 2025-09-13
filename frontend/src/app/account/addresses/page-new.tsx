'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, MapPin, Home, Building } from 'lucide-react'
import Link from 'next/link'

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export default function AddressesPage() {
  const { data: session, status } = useSession()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    type: 'home',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  // Mock addresses data for demo
  const mockAddresses: Address[] = [
    {
      id: '1',
      type: 'home',
      firstName: 'Aditya',
      lastName: 'Dasappanavar',
      address1: 'Aryan Homz 2nd Cross Road',
      address2: 'Addiganahalli',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560064',
      country: 'India',
      phone: '+91 9876543210',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      firstName: 'Aditya',
      lastName: 'Dasappanavar',
      company: 'Tech Solutions Inc.',
      address1: 'Brigade Road',
      address2: 'MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560001',
      country: 'India',
      phone: '+91 9876543210',
      isDefault: false
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAddresses(mockAddresses)
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

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5" />
      case 'work':
        return <Building className="h-5 w-5" />
      default:
        return <MapPin className="h-5 w-5" />
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.address1 || !formData.city || !formData.state || !formData.zipCode || !formData.country) {
      alert('Please fill in all required fields')
      return
    }

    const newAddress: Address = {
      id: editingAddress?.id || Date.now().toString(),
      type: formData.type as 'home' | 'work' | 'other',
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      phone: formData.phone,
      isDefault: addresses.length === 0 // First address becomes default
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id ? { ...newAddress, isDefault: addr.isDefault } : addr
      ))
      alert('Address updated successfully! ✅')
    } else {
      // Add new address
      setAddresses(prev => [...prev, newAddress])
      alert('New address added successfully! ✅')
    }

    // Reset form
    setFormData({
      type: 'home',
      firstName: '',
      lastName: '',
      company: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      phone: ''
    })
    setShowAddForm(false)
    setEditingAddress(null)
  }

  const handleEditAddress = (address: Address) => {
    setFormData({
      type: address.type,
      firstName: address.firstName,
      lastName: address.lastName,
      company: address.company || '',
      address1: address.address1,
      address2: address.address2 || '',
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      phone: address.phone || ''
    })
    setEditingAddress(address)
  }

  const deleteAddress = (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses => addresses.filter(addr => addr.id !== addressId))
      alert('Address deleted successfully! 🗑️')
    }
  }

  const setDefaultAddress = (addressId: string) => {
    setAddresses(addresses =>
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    )
    alert('Default address updated! ⭐')
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
              <h1 className="text-3xl font-bold text-primary-900">Manage Addresses</h1>
              <p className="text-primary-600 mt-2">
                Add and manage your delivery addresses
              </p>
            </div>
            <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </div>
        </div>

        {addresses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <MapPin className="h-16 w-16 text-primary-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary-900 mb-2">
                No addresses saved
              </h3>
              <p className="text-primary-600 mb-6">
                Add your first address to speed up checkout
              </p>
              <Button onClick={() => setShowAddForm(true)} className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Address
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className={`relative ${address.isDefault ? 'ring-2 ring-primary-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getAddressIcon(address.type)}
                      <CardTitle className="text-lg capitalize">
                        {address.type} Address
                      </CardTitle>
                    </div>
                    {address.isDefault && (
                      <span className="bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="font-semibold text-primary-900">
                      {address.firstName} {address.lastName}
                    </p>
                    {address.company && (
                      <p className="text-primary-700">{address.company}</p>
                    )}
                    <div className="text-primary-600">
                      <p>{address.address1}</p>
                      {address.address2 && <p>{address.address2}</p>}
                      <p>
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      <p>{address.country}</p>
                    </div>
                    {address.phone && (
                      <p className="text-primary-600">{address.phone}</p>
                    )}
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setDefaultAddress(address.id)}
                        className="text-blue-600 border-blue-300 hover:bg-blue-50"
                      >
                        Set Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAddress(address.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Add Another Address Card */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-green-400 transition-colors cursor-pointer" onClick={() => setShowAddForm(true)}>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Plus className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Add Another Address</h3>
                <p className="text-gray-500">Click to add a new delivery address</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Add/Edit Address Form Modal */}
        {(showAddForm || editingAddress) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Address Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="home">🏠 Home</option>
                      <option value="work">🏢 Work</option>
                      <option value="other">📍 Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <Input
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <Input
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Company name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1 *
                    </label>
                    <Input
                      value={formData.address1}
                      onChange={(e) => setFormData(prev => ({ ...prev, address1: e.target.value }))}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <Input
                      value={formData.address2}
                      onChange={(e) => setFormData(prev => ({ ...prev, address2: e.target.value }))}
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province *
                      </label>
                      <Input
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        placeholder="State"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP/Postal Code *
                      </label>
                      <Input
                        value={formData.zipCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                        placeholder="ZIP code"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        placeholder="Country"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone number"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                      {editingAddress ? 'Update Address' : 'Save Address'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false)
                        setEditingAddress(null)
                        setFormData({
                          type: 'home',
                          firstName: '',
                          lastName: '',
                          company: '',
                          address1: '',
                          address2: '',
                          city: '',
                          state: '',
                          zipCode: '',
                          country: '',
                          phone: ''
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
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
