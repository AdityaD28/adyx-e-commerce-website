import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, DocumentTextIcon, PhotoIcon, EnvelopeIcon, CalendarIcon } from '@heroicons/react/24/outline'

export default function PressPage() {
  const pressReleases = [
    {
      date: "March 15, 2024",
      title: "AdyX Launches Sustainable Fashion Initiative",
      description: "New eco-friendly product line and carbon-neutral shipping program announced",
      category: "Sustainability"
    },
    {
      date: "February 28, 2024",
      title: "AdyX Expands to European Markets",
      description: "Online fashion retailer now shipping to 15 new countries across Europe",
      category: "Expansion"
    },
    {
      date: "January 10, 2024",
      title: "AdyX Receives 'Best Online Shopping Experience' Award",
      description: "Recognized by Retail Innovation Awards for exceptional customer experience",
      category: "Awards"
    },
    {
      date: "December 5, 2023",
      title: "AdyX Partners with Emerging Fashion Designers",
      description: "New collaboration program supports up-and-coming talent in fashion industry",
      category: "Partnerships"
    }
  ]

  const mediaKit = [
    {
      title: "Company Logos",
      description: "High-resolution AdyX logos in various formats",
      format: "PNG, SVG, EPS"
    },
    {
      title: "Product Images",
      description: "Professional product photography for editorial use",
      format: "JPG, PNG"
    },
    {
      title: "Leadership Photos",
      description: "Executive headshots and team photos",
      format: "JPG"
    },
    {
      title: "Company Fact Sheet",
      description: "Key statistics and company information",
      format: "PDF"
    }
  ]

  const mediaContact = {
    name: "Sarah Johnson",
    title: "Director of Communications",
    email: "press@adyx.com",
    phone: "+1 (555) 123-4567"
  }

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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Press Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The latest news, announcements, and resources for media professionals covering AdyX.
          </p>
        </div>

        {/* Latest News */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex items-center mb-8">
            <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Latest Press Releases</h2>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-500">{release.date}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                      <p className="text-gray-700 mb-4">{release.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button variant="outline">Read More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline">View All Press Releases</Button>
          </div>
        </div>

        {/* Media Kit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <PhotoIcon className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Media Kit</h2>
              </div>
              
              <p className="text-gray-600 mb-6">
                Download high-quality assets, logos, and company information for your stories and articles.
              </p>
              
              <div className="space-y-4">
                {mediaKit.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <p className="text-xs text-gray-500">{item.format}</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
              
              <Button className="w-full mt-6">Download Complete Media Kit</Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <EnvelopeIcon className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Media Contact</h2>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-600">SJ</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{mediaContact.name}</h3>
                <p className="text-gray-600">{mediaContact.title}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <a href={`mailto:${mediaContact.email}`} className="text-blue-600 hover:underline">
                    {mediaContact.email}
                  </a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-gray-400 mr-3">📞</span>
                  <span className="text-gray-700">{mediaContact.phone}</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-sm text-blue-800">
                  <strong>For immediate assistance:</strong> Please email or call during business hours (9 AM - 6 PM EST, Monday - Friday)
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Company Facts */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Company At a Glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2020</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Awards & Recognition</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="text-yellow-500 text-2xl mb-2">🏆</div>
              <h4 className="font-semibold text-gray-900">Best Online Shopping Experience</h4>
              <p className="text-sm text-gray-600">Retail Innovation Awards 2024</p>
            </div>
            <div className="text-center p-4">
              <div className="text-green-500 text-2xl mb-2">🌱</div>
              <h4 className="font-semibold text-gray-900">Sustainable Business Leader</h4>
              <p className="text-sm text-gray-600">Green Commerce Awards 2023</p>
            </div>
            <div className="text-center p-4">
              <div className="text-blue-500 text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-900">Mobile App Excellence</h4>
              <p className="text-sm text-gray-600">Digital Commerce Awards 2023</p>
            </div>
          </div>
        </div>

        {/* Interview Requests */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">Interview Requests</h3>
          </div>
          <p className="text-gray-700 mb-6">
            Interested in interviewing our executives or learning more about AdyX? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Schedule Interview</Button>
            <Button variant="outline">Media Inquiry Form</Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Response time: 24-48 hours for media inquiries
          </p>
        </div>
      </div>
    </div>
  )
}
