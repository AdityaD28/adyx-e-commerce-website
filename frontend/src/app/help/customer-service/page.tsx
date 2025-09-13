import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, ChatBubbleLeftRightIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function CustomerServicePage() {
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Customer Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help! Get in touch with our customer service team for any questions or support you need.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Speak directly with our support team</p>
              <p className="text-lg font-semibold text-gray-900">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon-Fri: 9AM-6PM EST</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed help via email</p>
              <p className="text-lg font-semibold text-gray-900">support@adyx.com</p>
              <p className="text-sm text-gray-500">Response within 24 hours</p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-shadow">
            <CardContent>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with us in real-time</p>
              <Button className="mt-2">Start Chat</Button>
              <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How can I track my order?</h3>
                <p className="text-gray-600">You can track your order by logging into your account and viewing your order history, or by using the tracking number sent to your email.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What is your return policy?</h3>
                <p className="text-gray-600">We offer a 30-day return policy for unworn items in original condition. See our Shipping & Returns page for details.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you ship internationally?</h3>
                <p className="text-gray-600">Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I find my size?</h3>
                <p className="text-gray-600">Check our Size Guide for detailed measurements and sizing information for all our products.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I modify my order?</h3>
                <p className="text-gray-600">Orders can be modified within 1 hour of placement. After that, please contact customer service for assistance.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, PayPal, Apple Pay, and Google Pay for secure online payments.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hours of Operation */}
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ClockIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Service Hours</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Phone & Email Support</p>
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 4:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>
            <div>
              <p className="font-semibold">Live Chat</p>
              <p>Available 24 hours a day</p>
              <p>7 days a week</p>
              <p>Instant responses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
