'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBagIcon, MagnifyingGlassIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
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
            <Link href="/account">
              <Button variant="ghost" size="icon" aria-label="Account">
                <UserIcon className="h-6 w-6" />
              </Button>
            </Link>

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
                <Link
                  href="/account"
                  className="block text-lg font-medium text-primary-700 hover:text-primary-900 mb-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Account
                </Link>
                <Link
                  href="/cart"
                  className="block text-lg font-medium text-primary-700 hover:text-primary-900"
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
