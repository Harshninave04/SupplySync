import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Enhanced stats data with more meaningful metrics
  const stats = [
    {
      name: 'Active Orders',
      value: '12',
      trend: '↑ 16%',
      status: 'positive',
      detail: '2 new today',
    },
    {
      name: 'Inventory Items',
      value: '86',
      trend: '↓ 3%',
      status: 'negative',
      detail: '3 items low stock',
    },
    {
      name: 'Revenue (MTD)',
      value: '$12,450',
      trend: '↑ 8%',
      status: 'positive',
      detail: 'vs. last month',
    },
    {
      name: 'Pending Actions',
      value: '4',
      trend: 'Urgent',
      status: 'warning',
      detail: 'Needs review',
    },
  ];

  // Task data
  const tasks = [
    { id: 1, title: 'Review new order #3842', priority: 'high', due: 'Today' },
    { id: 2, title: 'Update inventory for Q2', priority: 'medium', due: 'Tomorrow' },
    { id: 3, title: 'Approve supplier invoice #INV-2023', priority: 'low', due: 'Next week' },
  ];

  // Recent activity data with more details
  const recentActivity = [
    {
      id: 1,
      type: 'order',
      title: 'New order received from Acme Corp',
      detail: 'Order #3842 for $1,250.00',
      time: '2 hours ago',
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      ),
    },
    {
      id: 2,
      type: 'inventory',
      title: 'Inventory level update completed',
      detail: '86 items updated, 3 items flagged low stock',
      time: 'Yesterday',
      icon: (
        <svg
          className="h-4 w-4"
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
      id: 3,
      type: 'payment',
      title: 'Payment processed for Order #2456',
      detail: '$3,750.00 payment confirmed',
      time: '3 days ago',
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
    {
      id: 4,
      type: 'alert',
      title: 'System alert: Backup completed',
      detail: 'Daily backup completed successfully',
      time: '4 days ago',
      icon: (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
    },
  ];

  // Recent orders or shipments based on user role
  const recentItems =
    user?.role === 'supplier'
      ? [
          {
            id: 'SHP-3842',
            client: 'Acme Corp',
            status: 'Shipped',
            date: '2025-04-10',
            amount: '$1,250.00',
          },
          {
            id: 'SHP-3841',
            client: 'TechStore',
            status: 'Preparing',
            date: '2025-04-09',
            amount: '$3,420.00',
          },
          {
            id: 'SHP-3840',
            client: 'MegaMart',
            status: 'Delivered',
            date: '2025-04-08',
            amount: '$2,180.00',
          },
        ]
      : [
          {
            id: 'ORD-2456',
            supplier: 'Global Supply Co',
            status: 'Processing',
            date: '2025-04-10',
            amount: '$3,750.00',
          },
          {
            id: 'ORD-2455',
            supplier: 'Tech Parts Inc',
            status: 'Shipped',
            date: '2025-04-08',
            amount: '$1,870.00',
          },
          {
            id: 'ORD-2454',
            supplier: 'Quality Goods',
            status: 'Delivered',
            date: '2025-04-05',
            amount: '$2,340.00',
          },
        ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      {/* <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-medium tracking-tight text-gray-900">SUPPLYSYNC</h1>
              <div className="hidden md:flex space-x-8 ml-10">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`text-sm tracking-wide ${
                    activeTab === 'overview'
                      ? 'text-black font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`text-sm tracking-wide ${
                    activeTab === 'orders'
                      ? 'text-black font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  {user?.role === 'supplier' ? 'Shipments' : 'Orders'}
                </button>
                <button
                  onClick={() => setActiveTab('inventory')}
                  className={`text-sm tracking-wide ${
                    activeTab === 'inventory'
                      ? 'text-black font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  Inventory
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`text-sm tracking-wide ${
                    activeTab === 'reports'
                      ? 'text-black font-medium'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}>
                  Reports
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">{user?.name.charAt(0)}</span>
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
                  {user?.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex justify-between items-baseline">
            <div>
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <h2 className="text-2xl font-medium text-gray-900">
                Good {getTimeOfDay()}, {user?.name}
              </h2>
            </div>
            <div className="text-right hidden md:block">
              <p className="text-sm text-gray-500">
                {user?.role === 'supplier' ? 'Supplier Dashboard' : 'Retailer Portal'}
              </p>
              <p className="text-xs text-gray-400">Last login: Today, 8:42 AM</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-md hover:shadow-sm transition-shadow">
              <p className="text-sm uppercase tracking-wider text-gray-500 mb-1">{stat.name}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-medium text-gray-900 mr-2">{stat.value}</p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    stat.status === 'positive'
                      ? 'bg-green-50 text-green-700'
                      : stat.status === 'negative'
                      ? 'bg-red-50 text-red-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-2">{stat.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders/Shipments */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">
                  Recent {user?.role === 'supplier' ? 'Shipments' : 'Orders'}
                </h3>
                <button
                  onClick={() => navigate(user?.role === 'supplier' ? '/shipments' : '/orders')}
                  className="text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {user?.role === 'supplier' ? 'Client' : 'Supplier'}
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.client || item.supplier}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              item.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : item.status === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : item.status === 'Processing' || item.status === 'Preparing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.amount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chart placeholder (would use a real chart library in production) */}
            <div className="bg-white border border-gray-200 rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {user?.role === 'supplier' ? 'Shipment Volume' : 'Order Volume'}
                </h3>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-gray-900 text-white rounded-md">
                    Week
                  </button>
                  <button className="text-xs px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-md">
                    Month
                  </button>
                  <button className="text-xs px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-md">
                    Quarter
                  </button>
                </div>
              </div>
              <div className="aspect-[2/1] bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center text-gray-400">
                <p className="text-sm">[Chart visualization would appear here]</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Tasks */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
                <button className="text-xs uppercase tracking-wider text-gray-500 hover:text-black transition-colors">
                  Add Task
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <div key={task.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <div className="flex items-center mt-1">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              task.priority === 'high'
                                ? 'bg-red-100 text-red-800'
                                : task.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">Due: {task.due}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center">
                <button className="text-sm text-gray-500 hover:text-gray-900">
                  View all tasks
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
              </div>
              <div className="space-y-0 divide-y divide-gray-100">
                {recentActivity.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-8 w-8 rounded-full mr-3 flex items-center justify-center ${
                          item.type === 'order'
                            ? 'bg-blue-100 text-blue-600'
                            : item.type === 'inventory'
                            ? 'bg-green-100 text-green-600'
                            : item.type === 'payment'
                            ? 'bg-purple-100 text-purple-600'
                            : 'bg-yellow-100 text-yellow-600'
                        }`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-900 font-medium">{item.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{item.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-center">
                <button className="text-sm text-gray-500 hover:text-gray-900">
                  View all activity
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-md p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate(user?.role === 'supplier' ? '/inventory' : '/orders/new')}
                  className="px-4 py-3 text-center border border-gray-900 text-sm font-medium tracking-wide hover:bg-gray-900 hover:text-white transition-colors rounded-md">
                  {user?.role === 'supplier' ? 'Manage Stock' : 'New Order'}
                </button>
                <button
                  onClick={() => navigate('/reports')}
                  className="px-4 py-3 text-center border border-gray-300 text-sm font-medium tracking-wide hover:border-gray-900 transition-colors rounded-md">
                  View Reports
                </button>
                <button
                  onClick={() => navigate('/settings')}
                  className="px-4 py-3 text-center border border-gray-300 text-sm font-medium tracking-wide hover:border-gray-900 transition-colors rounded-md">
                  Settings
                </button>
                <button
                  onClick={() => navigate('/support')}
                  className="px-4 py-3 text-center border border-gray-300 text-sm font-medium tracking-wide hover:border-gray-900 transition-colors rounded-md">
                  Support
                </button>
              </div>
            </div>
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
