import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function AccessibilityPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Accessibility Statement</h1>
          <p className="text-lg text-gray-600">
            AdyX is committed to making our website accessible to everyone
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700">
              AdyX is committed to ensuring digital accessibility for people with disabilities. We are continually 
              improving the user experience for everyone and applying the relevant accessibility standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Accessibility Features</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keyboard navigation support</li>
                <li>Screen reader compatibility</li>
                <li>Alt text for images</li>
                <li>High contrast color schemes</li>
                <li>Resizable text</li>
                <li>Clear and consistent navigation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Standards and Guidelines</h2>
            <p className="text-gray-700">
              Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines explain how to make web content more accessible for people with disabilities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Feedback and Support</h2>
            <p className="text-gray-700">
              We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers 
              or have suggestions for improvement, please contact us at{' '}
              <a href="mailto:accessibility@adyx.com" className="text-blue-600 hover:text-blue-800">
                accessibility@adyx.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ongoing Improvements</h2>
            <p className="text-gray-700">
              We regularly review our website and make improvements to ensure it remains accessible. 
              This is an ongoing process, and we appreciate your patience as we work to enhance the experience for all users.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
