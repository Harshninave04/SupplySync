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
      const data = await getSupplierInventory(supplierId);
      console.log('Inventory data:', data);
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
    // Check if item is already in cart
    const existingItem = cart.find((cartItem) => cartItem.product === item._id);

    if (existingItem) {
      // Update quantity if already in cart
      setCart((prev) =>
        prev.map((cartItem) =>
          cartItem.product === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        ),
      );
    } else {
      // Add new item to cart
      setCart((prev) => [
        ...prev,
        {
          product: item._id,
          quantity: 1,
          name: item.name,
          price: item.price,
        },
      ]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart((prev) =>
      prev.map((item) => (item.product === productId ? { ...item, quantity: newQuantity } : item)),
    );
  };

  const handleSubmitOrder = async () => {
    try {
      setLoading((prev) => ({ ...prev, submitting: true }));
      setError(null);
      const response = await createOrder({
        supplierId: selectedSupplier,
        items: cart,
        shippingAddress,
      });
      const orderId = response?.data?._id; // Assuming API returns { data: { _id, ... } }
      if (!orderId) {
        throw new Error('Order ID not returned from API');
      }
      console.log('Order created successfully:', { orderId, response });
      navigate('/orders', { state: { newOrderId: orderId } }); // Pass orderId to /orders
    } catch (err) {
      setError('Failed to place order: ' + err.message);
      console.error('Order submission error:', err);
    } finally {
      setLoading((prev) => ({ ...prev, submitting: false }));
    }
  };

  useEffect(() => {
    console.log('Current inventory state:', inventory);
  }, [inventory]);

  if (loading.suppliers && suppliers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 text-center">
          <div className="animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-black rounded-full mb-4"></div>
          <p className="text-xl font-medium">Loading suppliers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="p-8 bg-white shadow-lg rounded-lg text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-50 text-red-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Create New Order</h1>
          <p className="mt-2 text-gray-600">Select a supplier and add products to your order</p>
        </header>

        {/* Supplier Selection */}
        <section className="mb-12 bg-white shadow-sm rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Select Supplier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div
                key={supplier._id}
                className={`p-5 border border-gray-200 rounded-lg cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-md ${
                  selectedSupplier === supplier._id
                    ? 'bg-black text-white border-black'
                    : 'hover:border-gray-400'
                }`}
                onClick={() => handleSupplierSelect(supplier._id)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg">{supplier.name}</h3>
                  {selectedSupplier === supplier._id && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    selectedSupplier === supplier._id ? 'text-gray-200' : 'text-gray-600'
                  }`}>
                  {supplier.email}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Order Creation */}
        {selectedSupplier && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inventory List */}
            <div className="lg:col-span-2">
              <section className="bg-white shadow-sm rounded-xl p-6 mb-8">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                  <h2 className="text-2xl font-semibold">Available Products</h2>
                  {loading.inventory && (
                    <div className="flex items-center text-gray-500">
                      <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></div>
                      Loading...
                    </div>
                  )}
                </div>

                {loading.inventory ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="p-5 border rounded-lg animate-pulse">
                        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-28"></div>
                      </div>
                    ))}
                  </div>
                ) : inventory.length === 0 ? (
                  <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p className="text-lg font-medium text-gray-700 mb-1">No products available</p>
                    <p className="text-gray-500">
                      This supplier doesn't have any inventory items yet
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {inventory.map((item) => (
                      <div
                        key={item._id}
                        className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {item.description || 'No description available'}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-500">
                            {cart.find((cartItem) => cartItem.product === item._id)
                              ? `In cart: ${
                                  cart.find((cartItem) => cartItem.product === item._id).quantity
                                }`
                              : 'Not in cart'}
                          </span>
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800">
                            Add to Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-4 h-fit">
              <section className="bg-white shadow-sm rounded-xl p-6">
                <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Order Summary</h2>

                <div className="mb-6">
                  <label className="block mb-2 font-medium text-gray-700">Shipping Address</label>
                  <textarea
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-colors resize-none"
                    rows="3"
                    placeholder="Enter your shipping address"
                    required
                  />
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-lg">Your Cart</h3>
                    <span className="text-sm text-gray-500">{cart.length} items</span>
                  </div>

                  {cart.length === 0 ? (
                    <div className="py-6 text-center text-gray-500 border-y">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 mx-auto text-gray-300 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <p className="text-gray-500 italic mb-1">Your cart is empty</p>
                      <p className="text-sm text-gray-400">
                        Select a supplier and add products to your order
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                      {cart.map((item, index) => (
                        <div key={index} className="flex justify-between pb-3 border-b">
                          <div className="flex-1 pr-4">
                            <p className="font-medium mb-1">{item.name}</p>
                            <div className="flex items-center">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.product, item.quantity - 1)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-l">
                                -
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  handleUpdateQuantity(item.product, parseInt(e.target.value) || 1)
                                }
                                className="w-10 h-6 border-t border-b border-gray-300 text-center text-sm"
                              />
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item.product, item.quantity + 1)
                                }
                                className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-r">
                                +
                              </button>
                              <span className="ml-3 text-sm text-gray-500">
                                × ${item.price.toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <button
                              onClick={() => handleRemoveFromCart(item.product)}
                              className="text-sm text-gray-500 hover:text-red-500 mt-1">
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span>
                      ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping</span>
                    <span>{cart.length > 0 ? 'Calculated at checkout' : '-'}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                    <span>Total</span>
                    <span>
                      ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmitOrder}
                  disabled={cart.length === 0 || !shippingAddress || loading.submitting}
                  className={`w-full py-3 text-white rounded-lg transition-colors ${
                    cart.length === 0 || !shippingAddress
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-black hover:bg-gray-800'
                  }`}>
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
                      Processing Order...
                    </span>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateOrder;
