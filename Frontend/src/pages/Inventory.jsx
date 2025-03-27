import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../../services/api';

const Inventory = () => {
  const { user, loading: authLoading } = useAuth(); // Use auth loading state
  const [inventory, setInventory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });

  // Stable fetch function with error handling
  const fetchInventory = useCallback(async () => {
    if (!user || user.role !== 'supplier') return;

    setIsLoading(true);
    setError(null);

    try {
      const { data } = await api.get('/inventory');
      console.log('Fetched inventory:', data); // Debug the response
      setInventory(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to load inventory';
      console.error('Fetch inventory error:', err.response || err.message); // Debug the error
      setError(errorMsg);
      setInventory([]);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Fetch inventory when user is authenticated and not loading
  useEffect(() => {
    if (authLoading || !user || user.role !== 'supplier') return;

    fetchInventory();
  }, [authLoading, user, fetchInventory]);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const numericData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        quantity: parseInt(formData.quantity, 10) || 0,
      };

      const { data } = await api.post('/inventory', numericData);
      console.log('Added item:', data); // Debug the response
      setInventory((prev) => [data, ...prev]);
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to add item';
      console.error('Submit error:', err.response || err.message); // Debug the error
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Early return for auth loading
  if (authLoading) {
    return <div className="p-8 text-center">Loading authentication...</div>;
  }

  // Early return for unauthorized access
  if (!user || user.role !== 'supplier') {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold text-red-500">
          Supplier access required. Please log in as a supplier.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-12 mx-auto p-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Inventory Management</h1>

      {/* Error Display */}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {/* Add Item Form */}
      <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Quantity</label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full p-2 border rounded"
                min="0"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
            {isSubmitting ? 'Adding...' : 'Add Item'}
          </button>
        </form>
      </div>

      {/* Inventory List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <h2 className="text-xl font-semibold p-4 bg-gray-50 border-b">Current Inventory</h2>
        {isLoading ? (
          <div className="p-8 text-center">
            <p>Loading inventory data...</p>
          </div>
        ) : inventory.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No inventory items found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventory.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
