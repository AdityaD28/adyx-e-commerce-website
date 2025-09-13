import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, GlobeAltIcon, LeafIcon, RecycleIcon, SunIcon, HandRaisedIcon, TruckIcon } from '@heroicons/react/24/outline'

export default function SustainabilityPage() {
  const initiatives = [
    {
      icon: <LeafIcon className="h-8 w-8" />,
      title: "Sustainable Materials",
      description: "70% of our products use organic, recycled, or sustainably sourced materials",
      progress: 70
    },
    {
      icon: <RecycleIcon className="h-8 w-8" />,
      title: "Circular Fashion",
      description: "Take-back program for recycling and upcycling used clothing",
      progress: 45
    },
    {
      icon: <TruckIcon className="h-8 w-8" />,
      title: "Carbon Neutral Shipping",
      description: "100% of our shipping is carbon neutral through offset programs",
      progress: 100
    },
    {
      icon: <SunIcon className="h-8 w-8" />,
      title: "Renewable Energy",
      description: "Our facilities run on 85% renewable energy sources",
      progress: 85
    }
  ]

  const goals2030 = [
    {
      title: "Carbon Negative Operations",
      description: "Achieve net-negative carbon emissions across all operations",
      target: "2028"
    },
    {
      title: "100% Sustainable Materials",
      description: "All products made from sustainable or recycled materials",
      target: "2030"
    },
    {
      title: "Zero Waste to Landfill",
      description: "Eliminate all waste sent to landfills from our operations",
      target: "2027"
    },
    {
      title: "Circular Economy",
      description: "Create closed-loop system for all textile products",
      target: "2030"
    }
  ]

  const partnerships = [
    {
      name: "Better Cotton Initiative",
      description: "Supporting sustainable cotton farming practices worldwide",
      impact: "50,000 farmers supported"
    },
    {
      name: "Global Organic Textile Standard",
      description: "Ensuring organic fibers meet environmental and social criteria",
      impact: "GOTS certified supply chain"
    },
    {
      name: "Fashion Revolution",
      description: "Promoting transparency and ethical practices in fashion",
      impact: "Annual transparency report"
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Sustainability</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to creating a more sustainable future for fashion. Every choice we make considers our impact on people and the planet.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-16">
          <Image
            src="/images/Hero.jpg"
            alt="Sustainable fashion"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Fashion That Cares</h2>
              <p className="text-xl">Sustainable style for a better tomorrow</p>
            </div>
          </div>
        </div>

        {/* Current Initiatives */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <div className="flex items-center mb-8">
            <GlobeAltIcon className="h-8 w-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Current Initiatives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 text-green-600">
                      {initiative.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{initiative.title}</h3>
                      <p className="text-gray-600 mb-4">{initiative.description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${initiative.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{initiative.progress}% Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 2030 Goals */}
        <div className="bg-green-50 rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our 2030 Sustainability Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals2030.map((goal, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{goal.title}</h3>
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                      {goal.target}
                    </span>
                  </div>
                  <p className="text-gray-600">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Numbers */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">2.5M</div>
              <div className="text-gray-600">Pounds of CO2 Offset</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">150K</div>
              <div className="text-gray-600">Gallons of Water Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">75%</div>
              <div className="text-gray-600">Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Sustainable Products</div>
            </div>
          </div>
        </div>

        {/* Partnerships */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <HandRaisedIcon className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
              </div>
              
              <div className="space-y-6">
                {partnerships.map((partner, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
                    <p className="text-gray-600 mb-2">{partner.description}</p>
                    <span className="text-sm text-green-600 font-medium">{partner.impact}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sustainable Materials</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Organic Cotton</span>
                  <span className="text-green-600 font-semibold">35%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Recycled Polyester</span>
                  <span className="text-blue-600 font-semibold">25%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">Tencel/Lyocell</span>
                  <span className="text-purple-600 font-semibold">20%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="font-medium">Hemp & Linen</span>
                  <span className="text-yellow-600 font-semibold">15%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Other Sustainable</span>
                  <span className="text-gray-600 font-semibold">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Take Action */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-white text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Join Our Sustainability Journey</h3>
          <p className="text-xl mb-6 opacity-90">
            Every purchase makes a difference. Together, we can create a more sustainable future for fashion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary">Shop Sustainable</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
              Learn More
            </Button>
          </div>
        </div>

        {/* Reports & Transparency */}
        <div className="bg-gray-100 rounded-lg p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Transparency Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl mb-3">📊</div>
                <h4 className="font-semibold text-gray-900 mb-2">2023 Sustainability Report</h4>
                <p className="text-sm text-gray-600 mb-3">Annual progress and impact metrics</p>
                <Button variant="outline" size="sm">Download PDF</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl mb-3">🏭</div>
                <h4 className="font-semibold text-gray-900 mb-2">Supply Chain Map</h4>
                <p className="text-sm text-gray-600 mb-3">Transparency in our manufacturing</p>
                <Button variant="outline" size="sm">View Map</Button>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent>
                <div className="text-2xl mb-3">🌍</div>
                <h4 className="font-semibold text-gray-900 mb-2">Carbon Footprint</h4>
                <p className="text-sm text-gray-600 mb-3">Detailed environmental impact data</p>
                <Button variant="outline" size="sm">View Report</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact for Sustainability */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions About Our Sustainability Efforts?</h3>
          <p className="text-gray-700 mb-6">
            We're committed to transparency and would love to hear from you about our environmental initiatives.
          </p>
          <Button>Contact Our Sustainability Team</Button>
          <p className="text-sm text-gray-600 mt-4">
            Email: <a href="mailto:sustainability@adyx.com" className="text-blue-600 hover:underline">sustainability@adyx.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
