import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createOrder, getSuppliers, getSupplierInventory } from '../../../services/orderAPI';

const CreateOrder = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState({
    suppliers: false,
    inventory: false,
    submitting: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        setLoading((prev) => ({ ...prev, suppliers: true }));
        setError(null);
        const { data } = await getSuppliers();
        setSuppliers(data);
      } catch (err) {
        setError('Failed to load suppliers');
        console.error('Supplier load error:', err);
      } finally {
        setLoading((prev) => ({ ...prev, suppliers: false }));
      }
    };

    fetchSuppliers();
  }, []);

  const handleSupplierSelect = async (supplierId) => {
    try {
      setLoading((prev) => ({ ...prev, inventory: true }));
      setError(null);
      const data  = await getSupplierInventory(supplierId);
      console.log('Inventory data:', data); // Debug log
      setInventory(data);
      setSelectedSupplier(supplierId);
    } catch (err) {
      setError('Failed to load inventory');
      console.error('Inventory load error:', err);
    } finally {
      setLoading((prev) => ({ ...prev, inventory: false }));
    }
  };

  const handleAddToCart = (item) => {
    setCart((prev) => [
      ...prev,
      {
        product: item._id,
        quantity: 1,
        name: item.name,
        price: item.price,
      },
    ]);
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading((prev) => ({ ...prev, submitting: true }));
      setError(null);
      await createOrder({
        supplierId: selectedSupplier,
        items: cart,
        shippingAddress,
      });
      navigate('/orders');
    } catch (err) {
      setError('Failed to place order');
      console.error('Order submission error:', err);
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  // Debugging helper - log important states
  useEffect(() => {
    console.log('Current inventory state:', inventory);
  }, [inventory]);

  if (loading.suppliers && suppliers.length === 0) {
    return <div className="p-8 text-center">Loading suppliers...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-6">Create New Order</h1>

        {/* Supplier Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Select Supplier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suppliers.map((supplier) => (
              <div
                key={supplier._id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedSupplier === supplier._id
                    ? 'bg-blue-50 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleSupplierSelect(supplier._id)}>
                <h3 className="font-medium">{supplier.name}</h3>
                <p className="text-sm text-gray-600">{supplier.email}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Creation */}
        {selectedSupplier && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inventory List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Available Products</h2>

              {loading.inventory ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg animate-pulse">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                      <div className="h-8 bg-gray-200 rounded w-24"></div>
                    </div>
                  ))}
                </div>
              ) : inventory.length === 0 ? (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                  No products available from this supplier
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {inventory.map((item) => (
                    <div
                      key={item._id}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600 mb-2">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-500 mb-3">
                        {item.description || 'No description available'}
                      </p>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Add to Order
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="border p-4 rounded-lg sticky top-4 h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Shipping Address</label>
                <textarea
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                  required
                />
              </div>

              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-gray-500 italic">Your cart is empty</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="font-bold text-lg mb-4 border-t pt-3">
                Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
              </div>

              <button
                onClick={handleSubmitOrder}
                disabled={cart.length === 0 || loading.submitting}
                className={`w-full py-2 text-white rounded ${
                  cart.length === 0
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600'
                } transition-colors`}>
                {loading.submitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
