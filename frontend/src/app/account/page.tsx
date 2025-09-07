'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AccountPage() {
  const { data: session, status } = useSession()

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

  return (
    <div className="min-h-screen bg-primary-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900">My Account</h1>
          <p className="text-primary-600 mt-2">
            Manage your account settings and view your order history
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Full Name
                </label>
                <p className="mt-1 text-primary-900">{session.user?.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Email Address
                </label>
                <p className="mt-1 text-primary-900">{session.user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Account Type
                </label>
                <p className="mt-1 text-primary-900 capitalize">
                  {session.user?.role?.toLowerCase()}
                </p>
              </div>
              <div className="pt-4">
                <Button>Edit Profile</Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/orders" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    View Orders
                  </Button>
                </Link>
                <Link href="/wishlist" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    My Wishlist
                  </Button>
                </Link>
                <Link href="/account/addresses" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Manage Addresses
                  </Button>
                </Link>
                <Link href="/account/payment-methods" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    Payment Methods
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {session.user?.role === 'ADMIN' && (
              <Card>
                <CardHeader>
                  <CardTitle>Admin Panel</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/admin">
                    <Button className="w-full">
                      Access Admin Panel
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-primary-600 mb-4">No orders found</p>
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
