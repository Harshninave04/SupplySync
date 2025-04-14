import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSupplierOrders, getRetailerOrders } from '../../../services/orderAPI';
import OrderCard from './OrderCard';
import { Navigate } from 'react-router-dom';

const OrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } =
        user.role === 'supplier' ? await getSupplierOrders() : await getRetailerOrders();

      console.log('Fetched orders:', data); // Debug log
      setOrders(data);
    } catch (err) {
      console.error('Order fetch error:', err);
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (loading)
    return (
      <div className="container mx-auto p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500">{error}</div>
        <button onClick={fetchOrders} className="mt-2 px-4 py-2 bg-gray-100 hover:bg-gray-200">
          Retry
        </button>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">
          {user.role === 'supplier' ? 'Incoming' : 'Your'} Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-gray-50 p-8 text-center rounded-lg">
            <p className="text-gray-500">
              {user.role === 'supplier'
                ? 'No incoming orders yet'
                : 'You have not placed any orders yet'}
            </p>
            {user.role === 'retailer' && (
              <button
                onClick={() => Navigate('/orders/create')}
                className="mt-4 px-4 py-2 bg-black text-white rounded-md">
                Create Your First Order
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} userRole={user.role} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
