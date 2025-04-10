import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      // Always show navbar at the top of the page
      if (currentScrollY === 0) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <nav
        className={`bg-white shadow-md transition-transform duration-300 z-50 fixed w-full top-0 ${
          visible ? 'transform-none' : 'transform -translate-y-full'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left Side: Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">
                SupplySync
              </Link>
            </div>

            {/* Right Side: Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-gray-700 font-bold bg-sky-50 border-2 rounded-md px-3 py-2">
                    {user.name}
                  </span>
                  {user.role === 'retailer' && (
                    <Link
                      to="/orders/create"
                      className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300 ease-in-out">
                      New Order
                    </Link>
                  )}
                  {user.role === 'supplier' && (
                    <Link
                      to="/inventory"
                      className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300 ease-in-out">
                      Inventory
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300 ease-in-out">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-black bg-red-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger Menu (Mobile) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none"
                aria-label="Toggle menu">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {user ? (
                <>
                  <span className="block text-gray-700 font-bold bg-sky-50 border-2 rounded-md px-3 py-2 text-center">
                    {user.name}
                  </span>
                  {user.role === 'retailer' && (
                    <Link
                      to="/orders/create"
                      className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                      onClick={toggleMobileMenu}>
                      New Order
                    </Link>
                  )}
                  {user.role === 'supplier' && (
                    <Link
                      to="/inventory"
                      className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                      onClick={toggleMobileMenu}>
                      Inventory
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
                    onClick={toggleMobileMenu}>
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      toggleMobileMenu();
                    }}
                    className="w-full text-black bg-red-300 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium text-center">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={toggleMobileMenu}>
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={toggleMobileMenu}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-16"></div>

      {showModal && (
        <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300 animate-fade-in">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 scale-100 animate-scale-in">
            <div className="px-6 py-4 bg-gray-800 text-white rounded-t-lg flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <h2 className="text-xl font-semibold">Confirm Logout</h2>
            </div>

            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Are you sure you want to logout from your account? Any unsaved changes will be lost.
              </p>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-150 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    setShowModal(false); // Close modal first
                    await logout(); // Wait for logout to complete
                    navigate('/'); // Then navigate
                  }}
                  className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-150 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
