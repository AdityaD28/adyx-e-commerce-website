import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, MapPinIcon, ClockIcon, PhoneIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export default function StoreLocatorPage() {
  const stores = [
    {
      id: 1,
      name: "AdyX SoHo",
      address: "123 Broadway, New York, NY 10012",
      phone: "(212) 555-0123",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-7PM",
      services: ["Personal Shopping", "Alterations", "Returns"],
      distance: "0.5 miles"
    },
    {
      id: 2,
      name: "AdyX Fifth Avenue",
      address: "456 Fifth Avenue, New York, NY 10018",
      phone: "(212) 555-0456",
      hours: "Mon-Sat: 10AM-9PM, Sun: 11AM-7PM",
      services: ["Personal Shopping", "Style Consultation", "VIP Shopping"],
      distance: "1.2 miles"
    },
    {
      id: 3,
      name: "AdyX Brooklyn",
      address: "789 Atlantic Avenue, Brooklyn, NY 11217",
      phone: "(718) 555-0789",
      hours: "Mon-Sat: 11AM-7PM, Sun: 12PM-6PM",
      services: ["Personal Shopping", "Alterations"],
      distance: "3.8 miles"
    },
    {
      id: 4,
      name: "AdyX Los Angeles",
      address: "321 Melrose Avenue, Los Angeles, CA 90038",
      phone: "(323) 555-0321",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-7PM",
      services: ["Personal Shopping", "Style Consultation", "Returns"],
      distance: "2,789 miles"
    },
    {
      id: 5,
      name: "AdyX Chicago",
      address: "654 Michigan Avenue, Chicago, IL 60611",
      phone: "(312) 555-0654",
      hours: "Mon-Sat: 10AM-8PM, Sun: 11AM-6PM",
      services: ["Personal Shopping", "Alterations", "Returns"],
      distance: "790 miles"
    }
  ]

  const comingSoon = [
    {
      city: "San Francisco, CA",
      date: "Spring 2024",
      neighborhood: "Union Square"
    },
    {
      city: "Miami, FL",
      date: "Summer 2024",
      neighborhood: "Design District"
    },
    {
      city: "Seattle, WA",
      date: "Fall 2024",
      neighborhood: "Capitol Hill"
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Store Locator</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Visit our physical stores for a hands-on shopping experience, personal styling, and exclusive in-store events.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find a Store Near You</h2>
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter city, state, or zip code"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button>Search</Button>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Button variant="outline" size="sm">Use Current Location</Button>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-gray-200 rounded-lg h-96 mb-12 flex items-center justify-center">
          <div className="text-center text-gray-600">
            <MapPinIcon className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg">Interactive Map</p>
            <p className="text-sm">Map integration would go here</p>
          </div>
        </div>

        {/* Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Stores</h2>
            <div className="space-y-6">
              {stores.map((store) => (
                <Card key={store.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{store.name}</h3>
                        <p className="text-gray-600 text-sm">{store.distance} away</p>
                      </div>
                      <Button variant="outline" size="sm">Get Directions</Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <span className="text-gray-700">{store.address}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">{store.phone}</span>
                      </div>
                      
                      <div className="flex items-start">
                        <ClockIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <span className="text-gray-700">{store.hours}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Services Available:</p>
                      <div className="flex flex-wrap gap-2">
                        {store.services.map((service, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm">Store Details</Button>
                      <Button variant="outline" size="sm">Call Store</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {/* Coming Soon */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Coming Soon</h3>
                <div className="space-y-4">
                  {comingSoon.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">{location.city}</h4>
                        <p className="text-sm text-gray-600">{location.neighborhood}</p>
                      </div>
                      <span className="text-sm font-medium text-blue-600">{location.date}</span>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Get Updates on New Stores
                </Button>
              </CardContent>
            </Card>

            {/* Store Services */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">In-Store Services</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Personal Shopping</h4>
                    <p className="text-sm text-gray-600">One-on-one styling sessions with our fashion experts</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Style Consultation</h4>
                    <p className="text-sm text-gray-600">Complete wardrobe analysis and recommendations</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Alterations</h4>
                    <p className="text-sm text-gray-600">Professional tailoring for the perfect fit</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">VIP Shopping</h4>
                    <p className="text-sm text-gray-600">Private shopping experience by appointment</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Returns & Exchanges</h4>
                    <p className="text-sm text-gray-600">Easy in-store returns for online purchases</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Store Events */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Spring Collection Preview</h4>
                    <p className="text-sm text-gray-600">March 25, 2024 • AdyX SoHo</p>
                    <p className="text-sm text-gray-500">Exclusive first look at our spring collection</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Sustainable Fashion Workshop</h4>
                    <p className="text-sm text-gray-600">April 10, 2024 • AdyX Fifth Avenue</p>
                    <p className="text-sm text-gray-500">Learn about sustainable fashion choices</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900">Personal Styling Event</h4>
                    <p className="text-sm text-gray-600">April 20, 2024 • All Locations</p>
                    <p className="text-sm text-gray-500">Free styling consultations all day</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Events
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h3>
          <p className="text-gray-700 mb-6">
            Contact our store locator team for assistance finding the nearest AdyX location or getting more information about our stores.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button>Contact Us</Button>
            </Link>
            <Button variant="outline">Request a New Store Location</Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Store Locator Help: <a href="mailto:stores@adyx.com" className="text-blue-600 hover:underline">stores@adyx.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
