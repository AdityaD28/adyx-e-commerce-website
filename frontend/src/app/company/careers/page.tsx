import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, BriefcaseIcon, UsersIcon, StarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function CareersPage() {
  const benefits = [
    {
      icon: <UsersIcon className="h-8 w-8" />,
      title: "Great Team",
      description: "Work with passionate, talented people who love what they do"
    },
    {
      icon: <GlobeAltIcon className="h-8 w-8" />,
      title: "Remote Friendly",
      description: "Flexible work arrangements with remote and hybrid options"
    },
    {
      icon: <StarIcon className="h-8 w-8" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career development programs"
    }
  ]

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "New York, NY / Remote",
      type: "Full-time",
      description: "Build beautiful, responsive user interfaces using React and Next.js"
    },
    {
      title: "Product Designer (UX/UI)",
      department: "Design",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Design intuitive shopping experiences for our growing customer base"
    },
    {
      title: "Digital Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA / Remote",
      type: "Full-time",
      description: "Drive growth through digital marketing campaigns and strategy"
    },
    {
      title: "Customer Success Specialist",
      department: "Support",
      location: "Chicago, IL / Remote",
      type: "Full-time",
      description: "Help customers have amazing experiences with our products and service"
    },
    {
      title: "Data Analyst",
      department: "Analytics",
      location: "Austin, TX / Remote",
      type: "Full-time",
      description: "Turn data into insights that drive business decisions and growth"
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Join Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're building the future of fashion retail. Come help us create amazing experiences for millions of customers worldwide.
          </p>
        </div>

        {/* Company Culture */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Work at AdyX?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Benefits & Perks</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span><strong>Health & Wellness:</strong> Comprehensive medical, dental, and vision insurance</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span><strong>Time Off:</strong> Unlimited PTO and flexible work schedules</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span><strong>Learning:</strong> $2,000 annual learning budget for courses and conferences</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span><strong>Equipment:</strong> Top-tier laptop and home office setup allowance</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                  <span><strong>Stock Options:</strong> Equity participation in company growth</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Values</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Customer First</h4>
                  <p className="text-gray-600 text-sm">Every decision starts with how it impacts our customers</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Innovation</h4>
                  <p className="text-gray-600 text-sm">We're always looking for better ways to solve problems</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Transparency</h4>
                  <p className="text-gray-600 text-sm">Open communication and honest feedback drive our success</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Diversity & Inclusion</h4>
                  <p className="text-gray-600 text-sm">We celebrate different perspectives and backgrounds</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sustainability</h4>
                  <p className="text-gray-600 text-sm">Responsible business practices for a better future</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Open Positions */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex items-center mb-8">
            <BriefcaseIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Open Positions</h2>
          </div>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{position.title}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                      <p className="text-gray-700">{position.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button>Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Hiring Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Apply</h4>
              <p className="text-sm text-gray-600">Submit your application and resume</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Phone Screen</h4>
              <p className="text-sm text-gray-600">Brief conversation with our talent team</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Interview</h4>
              <p className="text-sm text-gray-600">Meet with team members and leadership</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Offer</h4>
              <p className="text-sm text-gray-600">Join the AdyX family!</p>
            </div>
          </div>
        </div>

        {/* Contact for Careers */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Don't See the Right Role?</h3>
          <p className="text-gray-700 mb-6">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>Send Your Resume</Button>
            <Button variant="outline">Join Our Talent Community</Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Questions about careers? Email us at <a href="mailto:careers@adyx.com" className="text-blue-600 hover:underline">careers@adyx.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
