import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav
      className={`bg-white shadow-md transition-transform duration-300 z-10 ${
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

          {/* Right Side: Navigation Links */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-gray-700">{user.name}</span>
                <Link
                  to="/inventory"
                  className="text-gray-600 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-300 ease-in-out">
                  Inventory
                </Link>
                <button
                  onClick={handleLogout}
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
