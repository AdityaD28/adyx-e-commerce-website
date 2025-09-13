import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, TruckIcon, ArrowPathIcon, ClockIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center mb-8">
          <Button variant="ghost">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Shipping & Returns</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about shipping options, delivery times, and our hassle-free return policy.
          </p>
        </div>

        {/* Shipping Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <TruckIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Shipping Options</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Standard Shipping</h3>
                  <p className="text-gray-600 mb-2">5-7 business days</p>
                  <p className="text-green-600 font-semibold">FREE on orders over $75</p>
                  <p className="text-gray-600">$5.99 on orders under $75</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Express Shipping</h3>
                  <p className="text-gray-600 mb-2">2-3 business days</p>
                  <p className="text-gray-900 font-semibold">$12.99</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Day Delivery</h3>
                  <p className="text-gray-600 mb-2">1 business day</p>
                  <p className="text-gray-900 font-semibold">$24.99</p>
                  <p className="text-sm text-gray-500">Order by 2PM EST for next day delivery</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Same Day Delivery</h3>
                  <p className="text-gray-600 mb-2">Available in select cities</p>
                  <p className="text-gray-900 font-semibold">$19.99</p>
                  <p className="text-sm text-gray-500">Order by 12PM for same day delivery</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <GlobeAltIcon className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">International Shipping</h2>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Canada & Mexico</h3>
                  <p className="text-gray-600 mb-2">7-14 business days</p>
                  <p className="text-gray-900 font-semibold">$15.99</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Europe & UK</h3>
                  <p className="text-gray-600 mb-2">10-21 business days</p>
                  <p className="text-gray-900 font-semibold">$25.99</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Asia Pacific</h3>
                  <p className="text-gray-600 mb-2">14-28 business days</p>
                  <p className="text-gray-900 font-semibold">$35.99</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Note:</strong> International orders may be subject to customs duties and taxes, which are the responsibility of the customer.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Returns Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex items-center mb-8">
            <ArrowPathIcon className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Returns & Exchanges</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Return Policy</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <ClockIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span><strong>30-day return window</strong> from delivery date</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span>Items must be unworn and in original condition</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span>Original tags and packaging required</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                  <span>Free return shipping on all orders</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Return</h3>
              <ol className="space-y-3 text-gray-700">
                <li><strong>1.</strong> Log into your account and select the order</li>
                <li><strong>2.</strong> Choose items to return and select reason</li>
                <li><strong>3.</strong> Print the prepaid return label</li>
                <li><strong>4.</strong> Pack items securely and attach label</li>
                <li><strong>5.</strong> Drop off at any carrier location</li>
              </ol>
              <Button className="mt-4">Start a Return</Button>
            </div>
          </div>
        </div>

        {/* Exchange Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowPathIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Exchanges</h3>
              <p className="text-gray-600">Wrong size? Exchange for free within 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Refunds</h3>
              <p className="text-gray-600">Refunds processed within 3-5 business days</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Not satisfied? We'll make it right</p>
            </CardContent>
          </Card>
        </div>

        {/* Special Cases */}
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Special Return Cases</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Final Sale Items</h4>
              <p className="text-gray-700 text-sm">Items marked as final sale cannot be returned or exchanged. These items are clearly marked on the product page.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Items</h4>
              <p className="text-gray-700 text-sm">Custom or personalized items cannot be returned unless there's a defect or error on our part.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Damaged Items</h4>
              <p className="text-gray-700 text-sm">If you receive a damaged item, contact us immediately with photos. We'll arrange an immediate replacement.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">International Returns</h4>
              <p className="text-gray-700 text-sm">International customers are responsible for return shipping costs unless the item was defective.</p>
            </div>
          </div>
        </div>

        {/* Contact for Help */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Help with Your Order?</h3>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help with shipping questions, returns, and exchanges.
          </p>
          <Link href="/help/customer-service">
            <Button>Contact Customer Service</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
