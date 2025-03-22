import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if the user is scrolling down
      if (currentScrollY > lastScrollY) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`shadow-md z-10 transition-all duration-300 ease-in-out transform ${
        scrolled ? '-translate-y-full' : 'translate-y-0'
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
