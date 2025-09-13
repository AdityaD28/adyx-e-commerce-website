'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useCartHydration } from '@/hooks/useCartHydration'
import CartSidebar from './cart/CartSidebar'

const navigation = [
  { name: 'Women', href: '/categories/women' },
  { name: 'Men', href: '/categories/men' },
  { name: 'Accessories', href: '/categories/accessories' },
  { name: 'Shoes', href: '/categories/shoes' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session, status } = useSession()
  const { toggleCart, getTotalItems, isHydrated } = useCartHydration()

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-primary-200 py-6 lg:border-none">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Bars3Icon className="h-6 w-6" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-900 tracking-tight">
                AdyX
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-primary-700 hover:text-primary-900 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center justify-end space-x-4 lg:space-x-6 lg:flex-1">
            {/* Search */}
            <div className="flex items-center relative">
              {searchOpen ? (
                <div className="flex items-center space-x-2 bg-white rounded-md px-3 py-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-64 focus:ring-0 focus:outline-none border-0 shadow-none"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                    className="h-6 w-6 flex-shrink-0"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search"
                >
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </Button>
              )}
            </div>

            {/* User account */}
            {status === 'loading' ? (
              <div className="h-6 w-6 animate-pulse bg-primary-200 rounded-full" />
            ) : session?.user ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-1"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="hidden sm:block text-sm font-medium">
                    {session.user.name?.split(' ')[0]}
                  </span>
                  <ChevronDownIcon className="h-4 w-4" />
                </Button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-primary-200 z-50">
                    <div className="py-1">
                      <Link
                        href="/account"
                        className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      {session.user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-1 border-primary-200" />
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin" className="cursor-pointer">
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" className="cursor-pointer">
                  <Button size="sm" className="cursor-pointer">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Shopping bag */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleCart}
              aria-label="Shopping cart" 
              className="relative cursor-pointer"
            >
              <ShoppingBagIcon className="h-6 w-6" />
              {isHydrated && getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent-500 text-xs font-medium text-white flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-white">
            <div className="flex items-center justify-between p-4 border-b border-primary-200">
              <span className="text-xl font-bold text-primary-900">AdyX</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <XMarkIcon className="h-6 w-6" />
              </Button>
            </div>
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-primary-700 hover:text-primary-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary-200">
                {session?.user ? (
                  <>
                    <div className="mb-4 px-4 py-2 bg-primary-50 rounded-md">
                      <p className="text-sm font-medium text-primary-900">
                        Welcome, {session.user.name}
                      </p>
                      <p className="text-xs text-primary-600">
                        {session.user.email}
                      </p>
                    </div>
                    <Link
                      href="/account"
                      className="block text-lg font-medium text-primary-700 hover:text-primary-900 mb-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block text-lg font-medium text-primary-700 hover:text-primary-900 mb-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {session.user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block text-lg font-medium text-primary-700 hover:text-primary-900 mb-4"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block text-lg font-medium text-red-600 hover:text-red-800 mb-4"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <Link
                      href="/auth/signin"
                      className="block text-lg font-medium text-primary-700 hover:text-primary-900"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block text-lg font-medium bg-primary-900 text-white px-4 py-2 rounded-md hover:bg-primary-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                <Link
                  href="/cart"
                  className="block text-lg font-medium text-primary-700 hover:text-primary-900 mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart ({getTotalItems()})
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  )
}
