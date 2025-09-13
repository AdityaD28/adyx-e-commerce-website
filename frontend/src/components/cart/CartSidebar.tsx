'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCartHydration } from '@/hooks/useCartHydration'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getTotalPrice,
    getTotalItems,
    isHydrated,
    clearCart
  } = useCartHydration()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggleCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            onClick={() => toggleCart()}
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {!isHydrated || items.length === 0 ? (
                            <div className="text-center py-12">
                              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                              </div>
                              <h3 className="text-gray-900 font-medium mb-2">
                                {!isHydrated ? 'Loading...' : 'Your cart is empty'}
                              </h3>
                              <p className="text-gray-600 text-sm mb-6">
                                {!isHydrated ? 'Please wait' : 'Add some products to get started'}
                              </p>
                              {isHydrated && (
                                <Link href="/products" onClick={toggleCart}>
                                  <Button>Continue Shopping</Button>
                                </Link>
                              )}
                            </div>
                          ) : (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {items.map((item) => (
                                <li key={item.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      src={item.image?.startsWith('http') ? '/images/placeholder.svg' : item.image || '/images/placeholder.svg'}
                                      alt={item.name}
                                      width={96}
                                      height={96}
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/images/placeholder.svg';
                                      }}
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3 className="text-sm">{item.name}</h3>
                                        <p className="ml-4">{formatPrice(item.price)}</p>
                                      </div>
                                      <div className="mt-1 text-sm text-gray-500 space-x-2">
                                        {item.color && <span>Color: {item.color}</span>}
                                        {item.size && <span>Size: {item.size}</span>}
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center space-x-2">
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="p-1 rounded-md hover:bg-gray-100"
                                          disabled={item.quantity <= 1}
                                        >
                                          <MinusIcon className="h-4 w-4" />
                                        </button>
                                        <span className="text-gray-700 font-medium min-w-[2rem] text-center">
                                          {item.quantity}
                                        </span>
                                        <button
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="p-1 rounded-md hover:bg-gray-100"
                                          disabled={item.quantity >= item.maxQuantity}
                                        >
                                          <PlusIcon className="h-4 w-4" />
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(item.id)}
                                          className="font-medium text-accent-600 hover:text-accent-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>

                    {isHydrated && items.length > 0 && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>{formatPrice(getTotalPrice())}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link href="/checkout" onClick={toggleCart}>
                            <button
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
                                cursor: 'pointer',
                                transition: 'all 0.2s ease-in-out',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                                width: '100%',
                                textAlign: 'center'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#374151'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#000000'
                              }}
                            >
                              Checkout
                            </button>
                          </Link>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-black hover:text-gray-700 underline"
                              onClick={toggleCart}
                              style={{ 
                                fontSize: '16px', 
                                fontWeight: 'bold',
                                color: '#000000'
                              }}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> →</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
