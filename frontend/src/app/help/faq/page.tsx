import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function FAQPage() {
  const faqs = [
    {
      category: "Orders & Payment",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Simply browse our products, select your size and color, add items to your cart, and proceed to checkout. You'll need to create an account or sign in to complete your purchase."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay. All payments are processed securely."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters our fulfillment process and cannot be changed. Contact customer service immediately if you need assistance."
        },
        {
          question: "When will my credit card be charged?",
          answer: "Your credit card will be charged when your order is confirmed and processed, typically within 24 hours of placing the order."
        }
      ]
    },
    {
      category: "Shipping & Delivery",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days and is free on orders over $75. Express shipping (2-3 days) and next-day delivery options are also available."
        },
        {
          question: "Do you ship internationally?",
          answer: "Yes, we ship to over 50 countries worldwide. International shipping takes 7-28 business days depending on the destination. Additional customs fees may apply."
        },
        {
          question: "How can I track my order?",
          answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and viewing your order history."
        },
        {
          question: "What if my package is lost or stolen?",
          answer: "If your package is marked as delivered but you haven't received it, please wait 24 hours and check with neighbors. If still missing, contact us immediately and we'll help resolve the issue."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy for unworn items in original condition with tags attached. Returns are free and easy - just use our online return portal."
        },
        {
          question: "How do I return an item?",
          answer: "Log into your account, find your order, select the items to return, print the prepaid return label, and drop off the package at any carrier location."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds are processed within 3-5 business days after we receive your returned items. The refund will appear on your original payment method."
        },
        {
          question: "Can I exchange for a different size?",
          answer: "Yes! Exchanges are free within 30 days. Simply return the original item and place a new order for the correct size, or use our exchange option during the return process."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I find my size?",
          answer: "Check our detailed Size Guide which includes measurement instructions and size charts for all categories. When in doubt, contact customer service for personalized sizing advice."
        },
        {
          question: "Are your products true to size?",
          answer: "Our products generally run true to size, but fit can vary by style. Check individual product pages for specific fit notes and customer reviews for additional insights."
        },
        {
          question: "Do you restock sold-out items?",
          answer: "Popular items are often restocked, but availability varies. Sign up for restock notifications on product pages to be alerted when items become available again."
        },
        {
          question: "Are your products authentic?",
          answer: "Yes, all products sold on AdyX are 100% authentic. We source directly from brands and authorized distributors to guarantee authenticity."
        }
      ]
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "How do I create an account?",
          answer: "Click 'Sign Up' in the top right corner and fill out the registration form. You can also create an account during checkout when placing your first order."
        },
        {
          question: "I forgot my password. How do I reset it?",
          answer: "Click 'Sign In' then 'Forgot Password' and enter your email address. You'll receive a password reset link within a few minutes."
        },
        {
          question: "How do I update my account information?",
          answer: "Log into your account and go to 'Account Settings' to update your personal information, shipping addresses, and payment methods."
        },
        {
          question: "Why can't I access the website?",
          answer: "Try clearing your browser cache and cookies, or try a different browser. If problems persist, contact our technical support team."
        }
      ]
    }
  ]

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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about ordering, shipping, returns, and more.
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <Card key={categoryIndex}>
              <CardContent className="p-8">
                <div className="flex items-center mb-8">
                  <QuestionMarkCircleIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">{category.category}</h2>
                </div>
                
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
          <p className="text-gray-700 mb-6">
            Can't find the answer you're looking for? Our customer service team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/help/customer-service">
              <Button>Contact Customer Service</Button>
            </Link>
            <Button variant="outline">Live Chat</Button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-2">Size Guide</h4>
              <p className="text-sm text-gray-600 mb-3">Find your perfect fit</p>
              <Link href="/help/size-guide">
                <Button variant="outline" size="sm">View Guide</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-2">Shipping Info</h4>
              <p className="text-sm text-gray-600 mb-3">Delivery options & times</p>
              <Link href="/help/shipping-returns">
                <Button variant="outline" size="sm">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-2">Return Policy</h4>
              <p className="text-sm text-gray-600 mb-3">Easy returns & exchanges</p>
              <Link href="/help/shipping-returns">
                <Button variant="outline" size="sm">View Policy</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent>
              <h4 className="font-semibold text-gray-900 mb-2">Track Order</h4>
              <p className="text-sm text-gray-600 mb-3">Check your order status</p>
              <Button variant="outline" size="sm">Track Now</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
