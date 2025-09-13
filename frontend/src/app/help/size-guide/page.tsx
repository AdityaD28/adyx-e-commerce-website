import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeftIcon, ScaleIcon, InformationCircleIcon } from '@heroicons/react/24/outline'

export default function SizeGuidePage() {
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Size Guide</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect fit with our comprehensive sizing charts and measurement guide.
          </p>
        </div>

        {/* How to Measure */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="flex items-center mb-6">
            <ScaleIcon className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">How to Measure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Body Measurements</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest</li>
                <li><strong>Waist:</strong> Measure around your natural waistline</li>
                <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
                <li><strong>Inseam:</strong> Measure from crotch to ankle</li>
                <li><strong>Shoulder:</strong> Measure from shoulder point to shoulder point</li>
              </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-start">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Measuring Tips</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Use a soft measuring tape</li>
                    <li>• Measure over undergarments</li>
                    <li>• Keep tape parallel to floor</li>
                    <li>• Don't pull tape too tight</li>
                    <li>• Ask someone to help if possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Women's Clothing */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Women's Clothing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Size</th>
                    <th className="text-left py-3 px-4 font-semibold">US</th>
                    <th className="text-left py-3 px-4 font-semibold">Bust (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Waist (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XS</td>
                    <td className="py-3 px-4">0-2</td>
                    <td className="py-3 px-4">32-33</td>
                    <td className="py-3 px-4">24-25</td>
                    <td className="py-3 px-4">34-35</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">4-6</td>
                    <td className="py-3 px-4">34-35</td>
                    <td className="py-3 px-4">26-27</td>
                    <td className="py-3 px-4">36-37</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">8-10</td>
                    <td className="py-3 px-4">36-37</td>
                    <td className="py-3 px-4">28-29</td>
                    <td className="py-3 px-4">38-39</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">12-14</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">30-32</td>
                    <td className="py-3 px-4">40-42</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">16-18</td>
                    <td className="py-3 px-4">42-44</td>
                    <td className="py-3 px-4">34-36</td>
                    <td className="py-3 px-4">44-46</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Men's Clothing */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Men's Clothing</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Size</th>
                    <th className="text-left py-3 px-4 font-semibold">US</th>
                    <th className="text-left py-3 px-4 font-semibold">Chest (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Waist (inches)</th>
                    <th className="text-left py-3 px-4 font-semibold">Neck (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">S</td>
                    <td className="py-3 px-4">34-36</td>
                    <td className="py-3 px-4">34-36</td>
                    <td className="py-3 px-4">28-30</td>
                    <td className="py-3 px-4">14-14.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">M</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">38-40</td>
                    <td className="py-3 px-4">32-34</td>
                    <td className="py-3 px-4">15-15.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">L</td>
                    <td className="py-3 px-4">42-44</td>
                    <td className="py-3 px-4">42-44</td>
                    <td className="py-3 px-4">36-38</td>
                    <td className="py-3 px-4">16-16.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XL</td>
                    <td className="py-3 px-4">46-48</td>
                    <td className="py-3 px-4">46-48</td>
                    <td className="py-3 px-4">40-42</td>
                    <td className="py-3 px-4">17-17.5</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">XXL</td>
                    <td className="py-3 px-4">50-52</td>
                    <td className="py-3 px-4">50-52</td>
                    <td className="py-3 px-4">44-46</td>
                    <td className="py-3 px-4">18-18.5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Shoes */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Shoe Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Women's Shoes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-semibold">US</th>
                        <th className="text-left py-2 px-3 font-semibold">EU</th>
                        <th className="text-left py-2 px-3 font-semibold">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2 px-3">6</td><td className="py-2 px-3">36</td><td className="py-2 px-3">9.25</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">7</td><td className="py-2 px-3">37</td><td className="py-2 px-3">9.5</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">8</td><td className="py-2 px-3">38</td><td className="py-2 px-3">9.75</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">9</td><td className="py-2 px-3">39</td><td className="py-2 px-3">10</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">10</td><td className="py-2 px-3">40</td><td className="py-2 px-3">10.5</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Men's Shoes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-semibold">US</th>
                        <th className="text-left py-2 px-3 font-semibold">EU</th>
                        <th className="text-left py-2 px-3 font-semibold">Length (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2 px-3">8</td><td className="py-2 px-3">41</td><td className="py-2 px-3">10.25</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">9</td><td className="py-2 px-3">42</td><td className="py-2 px-3">10.5</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">10</td><td className="py-2 px-3">43</td><td className="py-2 px-3">10.75</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">11</td><td className="py-2 px-3">44</td><td className="py-2 px-3">11</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">12</td><td className="py-2 px-3">45</td><td className="py-2 px-3">11.5</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Still Need Help */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h3>
          <p className="text-gray-700 mb-6">
            Can't find your size or have questions about fit? Our customer service team is here to help!
          </p>
          <Link href="/help/customer-service">
            <Button className="mr-4">Contact Customer Service</Button>
          </Link>
          <Button variant="outline">Size Recommendation Tool</Button>
        </div>
      </div>
    </div>
  )
}
