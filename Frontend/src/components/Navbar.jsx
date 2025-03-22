import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
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
