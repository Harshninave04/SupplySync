import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-700">
          Welcome, {user?.name} ({user?.role})!
        </p>
        <button
          onClick={logout}
          className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
