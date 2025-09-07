import Link from 'next/link'

const footerSections = [
  {
    title: 'Shop',
    links: [
      { name: 'Women', href: '/categories/women' },
      { name: 'Men', href: '/categories/men' },
      { name: 'Accessories', href: '/categories/accessories' },
      { name: 'Shoes', href: '/categories/shoes' },
      { name: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { name: 'Customer Service', href: '/help/customer-service' },
      { name: 'Size Guide', href: '/help/size-guide' },
      { name: 'Shipping & Returns', href: '/help/shipping-returns' },
      { name: 'FAQ', href: '/help/faq' },
      { name: 'Contact Us', href: '/help/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About AdyX', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Store Locator', href: '/stores' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '/legal/privacy' },
      { name: 'Terms of Service', href: '/legal/terms' },
      { name: 'Cookie Policy', href: '/legal/cookies' },
      { name: 'Accessibility', href: '/legal/accessibility' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary-50 border-t border-primary-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-primary-900 tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-primary-600 hover:text-primary-900 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter signup */}
          <div className="mt-12 border-t border-primary-200 pt-8">
            <div className="max-w-md">
              <h3 className="text-sm font-semibold text-primary-900 tracking-wider uppercase">
                Subscribe to our newsletter
              </h3>
              <p className="mt-2 text-sm text-primary-600">
                Get the latest updates on new collections and exclusive offers.
              </p>
              <form className="mt-4 flex flex-col sm:flex-row">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  name="email-address"
                  id="email-address"
                  autoComplete="email"
                  required
                  className="w-full min-w-0 appearance-none rounded-md border border-primary-300 bg-white px-4 py-2 text-base text-primary-900 placeholder-primary-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  placeholder="Enter your email"
                />
                <div className="mt-3 sm:ml-3 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-900 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-8 border-t border-primary-200 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex space-x-6 text-sm text-primary-600">
              <span>&copy; 2024 AdyX. All rights reserved.</span>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex space-x-6">
                {/* Social media icons can be added here */}
                <span className="text-sm text-primary-600">
                  Follow us on social media
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
