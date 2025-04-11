import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const {user} = useAuth(); // Assuming you have a useAuth hook to get user info
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Enhanced Design */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gray-900 opacity-5 pattern-grid-lg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-3">
              <span className="text-sm font-bold tracking-wider bg-gray-900 text-white px-4 py-1 rounded-full uppercase">
                Supply Chain Management
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              <span className="block">Supply Chain</span>
              <span className="block text-gray-800 relative">
                <span className="relative inline-block">
                  Simplified
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-gray-200 -z-10 transform -rotate-1"></span>
                </span>
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect suppliers and retailers in a seamless digital marketplace designed for the
              modern business landscape.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Dashboard
                  </Link>
                  {user.role === 'supplier' && (
                    <Link
                      to="/inventory"
                      className="px-8 py-4 border border-blue-500 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      Inventory
                    </Link>
                  )}
                  {user.role === 'retailer' && (
                    <Link
                      to="/orders/create"
                      className="px-8 py-4 border border-blue-500 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                      New Order
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 md:text-lg md:px-10 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="px-8 py-4 border border-gray-300 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:text-lg md:px-10 transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      {/* Statistics Section - New */}
      <div className="bg-white py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Businesses' },
              { value: '10k+', label: 'Orders Processed' },
              { value: '60%', label: 'Time Saved' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm uppercase tracking-wider text-gray-500 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
              Key Benefits
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
              Powerful Features for Modern Supply Chains
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Everything you need to optimize your supply chain operations in one platform
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              {
                name: 'Inventory Management',
                description:
                  'Real-time tracking and control of your stock levels across multiple locations with automated alerts and reordering.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                ),
              },
              {
                name: 'Order Processing',
                description:
                  'Seamless order fulfillment with automated notifications, status tracking, and priority management.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                ),
              },
              {
                name: 'Supplier Network',
                description:
                  'Connect with trusted suppliers and discover new business opportunities through our verified partner network.',
                icon: (
                  <svg
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                ),
              },
            ].map((feature) => (
              <div key={feature.name} className="relative">
                <div className="flow-root bg-gray-50 rounded-xl px-8 py-10 h-full hover:shadow-md transition-shadow transform hover:-translate-y-1 border border-gray-100">
                  <div>
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-900 text-white text-xl mx-auto mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 text-center mb-3">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600 text-center">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section - New */}
      <div className="bg-gray-50 py-24 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
              Simplify Your Supply Chain in Three Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Register & Connect',
                description:
                  'Create your account and connect with verified suppliers or retailers in your industry.',
              },
              {
                step: '02',
                title: 'Manage Inventory',
                description:
                  'Set up your product catalog and manage inventory levels across multiple locations.',
              },
              {
                step: '03',
                title: 'Process Orders',
                description:
                  'Receive, fulfill, and track orders through our streamlined, automated system.',
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full">
                  <div className="text-4xl font-bold text-gray-200 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">
              Testimonials
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl tracking-tight">
              Trusted by Growing Businesses
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
            {[
              {
                quote:
                  "SupplySync transformed how we manage our supplier relationships. We've reduced our order processing time by 60% and improved accuracy significantly.",
                author: 'Sarah Johnson',
                role: 'COO, RetailChain',
                image: 'SJ',
              },
              {
                quote:
                  'Finally a platform that understands the complexity of modern supply chains. The interface is intuitive and the features are exactly what we needed.',
                author: 'Michael Chen',
                role: 'Procurement Manager, TechSupply',
                image: 'MC',
              },
              {
                quote:
                  "The analytics dashboard gives us insights we never had before. We've optimized our inventory levels and saved thousands in carrying costs.",
                author: 'Jessica Rivera',
                role: 'Supply Chain Director',
                image: 'JR',
              },
              {
                quote:
                  "Customer support is outstanding. Any time we've had questions, the team has been responsive and helpful. A true partnership.",
                author: 'Thomas Clark',
                role: 'Operations Manager',
                image: 'TC',
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-lg font-bold mr-4">
                    {testimonial.image}
                  </div>
                  <div>
                    <p className="text-gray-700 mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-bold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Ready to transform your supply chain?
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
            Join hundreds of businesses already using SupplySync to streamline their operations
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <>
                <Link
                  to="/about"
                  className="px-8 py-4 text-base font-medium rounded-md text-white border border-gray-600 hover:bg-gray-800 md:text-lg md:px-10 transition-all transform hover:-translate-y-1">
                  Know more about us
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Free Trial
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="px-8 py-4 text-base font-medium rounded-md text-white border border-gray-600 hover:bg-gray-800 md:text-lg md:px-10 transition-all transform hover:-translate-y-1">
              Schedule Demo
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">No credit card required. 14-day free trial.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} SupplySync. All rights reserved.
            </div>
            <div className="flex space-x-6">
              {['Twitter', 'LinkedIn', 'Facebook', 'GitHub'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{social}</span>
                  <span className="text-sm">{social}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
