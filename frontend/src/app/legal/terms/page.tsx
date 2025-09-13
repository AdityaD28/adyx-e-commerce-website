import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center mb-8">
          <Button variant="ghost">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By accessing and using the AdyX website, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Permission is granted to temporarily download one copy of the materials on AdyX's website for personal, 
                non-commercial transitory viewing only.
              </p>
              <p>This license shall automatically terminate if you violate any of these restrictions.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product Information</h2>
            <p className="text-gray-700">
              We strive to provide accurate product descriptions and pricing. However, we do not warrant that product 
              descriptions or other content is accurate, complete, reliable, current, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Orders and Payment</h2>
            <div className="space-y-4 text-gray-700">
              <p>All orders are subject to availability and confirmation of the order price.</p>
              <p>Payment must be received by us before the dispatch of goods.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returns and Refunds</h2>
            <p className="text-gray-700">
              Please refer to our Returns Policy for detailed information about returns, exchanges, and refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at{' '}
              <a href="mailto:legal@adyx.com" className="text-blue-600 hover:text-blue-800">
                legal@adyx.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
