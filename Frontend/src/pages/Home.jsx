import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState, useRef } from 'react';

const Home = () => {
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const processRef = useRef(null);
  const [isVisible, setIsVisible] = useState({
    stats: false,
    features: false,
    process: false,
    testimonials: false,
  });

  // Animate on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Check which sections are visible
      const sections = {
        stats: statsRef.current?.getBoundingClientRect().top < window.innerHeight * 0.75,
        features: featuresRef.current?.getBoundingClientRect().top < window.innerHeight * 0.75,
        process: processRef.current?.getBoundingClientRect().top < window.innerHeight * 0.75,
      };

      setIsVisible((prev) => ({
        ...prev,
        ...sections,
      }));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Moving gradient animation
  const gradientPos = Math.min(scrollY * 0.05, 100);

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Animated Background */}
      <div ref={heroRef} className="relative overflow-hidden">
        {/* Enhanced background gradient with more modern colors */}
        <div
          className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800"
          style={{
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
          }}></div>

        {/* Improved pattern overlay with subtle animation */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)',
              backgroundSize: '100px 100px',
              animation: 'patternSlide 60s linear infinite',
              transform: `translateY(${scrollY * 0.1}px)`,
            }}></div>
        </div>

        {/* Animated particles */}
        <div className="absolute inset-0 z-1 opacity-40">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 100%)',
            }}></div>
        </div>

        {/* Content container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-3 animate-fadeIn">
              <span className="text-sm font-bold tracking-wider bg-white text-gray-900 px-4 py-1 rounded-full uppercase shadow-md">
                Supply Chain Management
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-slideUp">
              <span className="block">Supply Chain</span>
              <span className="block text-white relative">
                <span className="relative inline-block">
                  Simplified
                  {/* Underline effect */}
                  <span className="absolute bottom-2 left-0 right-0 h-3 bg-indigo-500 opacity-30 -z-10 transform skew-x-3"></span>
                </span>
              </span>
            </h1>
            <p
              className="mt-8 text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeIn opacity-0"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
              Connect suppliers and retailers in a seamless digital marketplace designed for the
              modern business landscape.
            </p>
            <div
              className="mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-fadeIn opacity-0"
              style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="relative overflow-hidden px-8 py-4 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 md:text-lg md:px-8 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                    <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-gray-200 group-hover:w-full"></span>
                    <span className="relative">Dashboard</span>
                  </Link>
                  {user.role === 'supplier' && (
                    <Link
                      to="/inventory"
                      className="relative overflow-hidden px-8 py-4 border border-indigo-500 text-base font-medium rounded-md text-white bg-transparent hover:bg-indigo-500 md:text-lg md:px-8 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                      <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-indigo-600 group-hover:w-full"></span>
                      <span className="relative">Inventory</span>
                    </Link>
                  )}
                  {user.role === 'retailer' && (
                    <Link
                      to="/orders/create"
                      className="relative overflow-hidden px-8 py-4 border border-indigo-500 text-base font-medium rounded-md text-white bg-transparent hover:bg-indigo-500 md:text-lg md:px-8 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                      <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-indigo-600 group-hover:w-full"></span>
                      <span className="relative">New Order</span>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="relative overflow-hidden px-8 py-4 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                    <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-gray-200 group-hover:w-full"></span>
                    <span className="relative">Get Started</span>
                  </Link>
                  <Link
                    to="/login"
                    className="relative overflow-hidden px-8 py-4 border border-indigo-500 text-base font-medium rounded-md text-white bg-transparent hover:bg-indigo-500 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                    <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-indigo-600 group-hover:w-full"></span>
                    <span className="relative">Sign In</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Better bottom transition with gradient and blur */}
        {/* <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white to-transparent backdrop-blur-sm"></div> */}

        {/* Animated light effects instead of floating bubbles */}
        <div className="hidden md:block">
          <div className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full bg-indigo-600 opacity-5 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/5 w-80 h-80 rounded-full bg-blue-400 opacity-5 blur-3xl animate-pulse-slower"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-purple-500 opacity-5 blur-3xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Statistics Section - With fade-in animation */}
      <div ref={statsRef} className="bg-white py-16 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Businesses' },
              { value: '10k+', label: 'Orders Processed' },
              { value: '60%', label: 'Time Saved' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transform ${
                  isVisible.stats ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}>
                <span className="text-4xl md:text-5xl font-bold text-gray-900 relative">
                  {stat.value}
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gray-200 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
                <span className="text-sm uppercase tracking-wider text-gray-500 mt-2">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - With slide-in animation */}
      <div ref={featuresRef} className="py-24 bg-white">
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
            ].map((feature, index) => (
              <div
                key={feature.name}
                className={`relative transform ${
                  isVisible.features ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flow-root bg-gray-50 rounded-xl px-8 py-10 h-full hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 group">
                  <div>
                    <div className="flex items-center justify-center h-14 w-14 rounded-full bg-gray-900 text-white text-xl mx-auto mb-6 group-hover:scale-110 transition-transform">
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

      {/* Process Section - With step animation */}
      <div ref={processRef} className="bg-gray-50 py-24 border-t border-b border-gray-100">
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
              <div
                key={index}
                className={`relative transform ${
                  isVisible.process ? 'animate-fadeInUp opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 h-full hover:shadow-lg transition-all transform hover:-translate-y-1 group">
                  <div className="text-4xl font-bold text-gray-200 mb-4 transition-all group-hover:text-gray-300">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < 2 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-6 w-12 h-1 bg-gray-300 transform scale-x-0 animate-scaleX"
                    style={{
                      animationDelay: `${(index + 1) * 0.3}s`,
                      animationFillMode: 'forwards',
                      animationPlayState: isVisible.process ? 'running' : 'paused',
                    }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section - With hover effects */}
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
                className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-gray-50 hover:to-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-bold mr-4 hover:scale-110 transition-transform">
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

      {/* CTA Section - With animated background */}
      <div className="bg-gray-900 py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 25%), radial-gradient(circle at 80% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 20%)',
            animation: 'pulse 10s infinite alternate',
          }}></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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
                  className="relative overflow-hidden px-8 py-4 text-base font-medium rounded-md text-white border border-gray-600 hover:bg-gray-800 md:text-lg md:px-10 transition-all transform hover:-translate-y-1 group">
                  <span className="absolute inset-0 w-0 bg-gray-700 transition-all duration-300 ease-out group-hover:w-full"></span>
                  <span className="relative">Know more about us</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="relative overflow-hidden px-8 py-4 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 md:text-lg md:px-10 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 group">
                  <span className="absolute inset-0 w-0 bg-gray-200 transition-all duration-500 ease-out group-hover:w-full"></span>
                  <span className="relative">Start Free Trial</span>
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="relative overflow-hidden px-8 py-4 text-base font-medium rounded-md text-white border border-gray-600 hover:bg-gray-800 md:text-lg md:px-10 transition-all transform hover:-translate-y-1 group">
              <span className="absolute inset-0 w-0 bg-gray-700 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">Schedule Demo</span>
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
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Partners
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
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
                <a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-gray-800 transition-colors">
                  <span className="sr-only">{social}</span>
                  <span className="text-sm">{social}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* CSS animations */}
      <style jsx>
        {`
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes pulse {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0px);
            }
          }

          @keyframes panBackground {
            0% {
              background-position: 0px 0px;
            }
            100% {
              background-position: 1000px 0px;
            }
          }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes slideUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scaleX {
            0% {
              transform: scaleX(0);
            }
            100% {
              transform: scaleX(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-in-out;
          }

          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }

          .animate-slideUp {
            animation: slideUp 0.8s ease-out;
          }

          .animate-scaleX {
            animation: scaleX 0.5s ease-out forwards;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes patternSlide {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 1000px 1000px;
            }
          }

          @keyframes pulse-slow {
            0% {
              transform: scale(1);
              opacity: 0.05;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.1;
            }
            100% {
              transform: scale(1);
              opacity: 0.05;
            }
          }

          @keyframes pulse-slower {
            0% {
              transform: scale(1);
              opacity: 0.05;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.1;
            }
            100% {
              transform: scale(1);
              opacity: 0.05;
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 10s ease-in-out infinite;
          }

          .animate-pulse-slower {
            animation: pulse-slower 15s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;
