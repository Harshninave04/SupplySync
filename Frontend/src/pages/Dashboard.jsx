import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Stats data
  const stats = [
    { name: 'Active Orders', value: '12', trend: '↑ 2 new' },
    { name: 'Inventory Items', value: '86', trend: '↓ 3 low stock' },
    { name: 'Pending Actions', value: '4', trend: 'Needs review' },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      {/* Minimal Header */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-light tracking-tight text-gray-900">SUPPLYSYNC</h1>
          <button
            onClick={handleLogout}
            className="text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
            Sign Out
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h2 className="text-3xl font-light text-gray-900 mb-2">
            Good {getTimeOfDay()}, {user?.name}
          </h2>
          <p className="text-gray-500">
            {user?.role === 'supplier' ? 'Supplier dashboard' : 'Retailer portal'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="border border-gray-200 p-6 rounded-sm">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-3xl font-light text-gray-900 mr-2">{stat.value}</p>
                <span className="text-xs text-gray-500">{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mb-12">
          <h3 className="text-lg font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start pb-4 border-b border-gray-100">
                <div className="h-8 w-8 bg-gray-100 rounded-full mr-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">{item}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    {item === 1 && 'New order received from Acme Corp'}
                    {item === 2 && 'Inventory level update completed'}
                    {item === 3 && 'Payment processed for Order #2456'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {item === 1 && '2 hours ago'}
                    {item === 2 && 'Yesterday'}
                    {item === 3 && '3 days ago'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-light text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Quick Actions
          </h3>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate(user?.role === 'supplier' ? '/inventory' : '/orders')}
              className="px-4 py-2 border border-black text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-colors">
              {user?.role === 'supplier' ? 'Manage Stock' : 'New Order'}
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="px-4 py-2 border border-gray-300 text-sm uppercase tracking-wider hover:border-black transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}

export default Dashboard;
