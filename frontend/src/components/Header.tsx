'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon, Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { Button } from './ui/button'
import { Input } from './ui/input'

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
          <div className="flex flex-1 items-center justify-end space-x-4 lg:space-x-6">
            {/* Search */}
            <div className="flex items-center">
              {searchOpen ? (
                <div className="flex items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-48 sm:w-64"
                    autoFocus
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchOpen(false)}
                  >
                    <XMarkIcon className="h-5 w-5" />
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
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Shopping bag */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping cart" className="relative">
                <ShoppingBagIcon className="h-6 w-6" />
                {/* Cart count badge */}
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-500 text-xs font-medium text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop search bar (hidden when mobile search is active) */}
        {!searchOpen && (
          <div className="hidden lg:block pb-6">
            <div className="relative max-w-md mx-auto">
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary-400" />
            </div>
          </div>
        )}
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
                  Cart (3)
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
