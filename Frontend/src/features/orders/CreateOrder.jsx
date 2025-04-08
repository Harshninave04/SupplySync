import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { getSupplierInventory, createOrder } from '../../../services/orderAPI';

const CreateOrder = () => {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const { data } = await api.get('/users/suppliers');
        setSuppliers(data);
      } catch (err) {
        console.error('Failed to fetch suppliers', err);
      }
    };
    fetchSuppliers();
  }, []);

  const handleSupplierSelect = async (supplierId) => {
    try {
      const { data } = await getSupplierInventory(supplierId);
      setInventory(data);
      setSelectedSupplier(supplierId);
    } catch (err) {
      console.error('Failed to fetch inventory', err);
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
      await createOrder({
        supplierId: selectedSupplier,
        items: cart,
        shippingAddress,
      });
      navigate('/orders');
    } catch (err) {
      console.error('Order failed', err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Order</h1>

      {/* Supplier Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Supplier</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((supplier) => (
            <div
              key={supplier._id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedSupplier === supplier._id ? 'bg-blue-50 border-blue-500' : ''
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventory.map((item) => (
                <div key={item._id} className="p-4 border rounded-lg">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="mb-4">
              <label className="block mb-2">Shipping Address</label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
                required
              />
            </div>

            <div className="space-y-3 mb-6">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="font-bold text-lg mb-4">
              Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
            </div>

            <button
              onClick={handleSubmitOrder}
              disabled={cart.length === 0}
              className="w-full py-2 bg-green-500 text-white rounded disabled:bg-gray-300">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
