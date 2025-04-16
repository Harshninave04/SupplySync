import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSupplierOrders, getRetailerOrders } from '../../../services/orderAPI';
import OrderCard from './OrderCard';
import { useNavigate, useLocation } from 'react-router-dom';

const OrderList = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const { state } = useLocation();

  const fetchOrders = async (retryCount = 0, maxRetries = 3) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching orders for user:', user.role, 'newOrderId:', state?.newOrderId);
      const { data } =
        user.role === 'supplier' ? await getSupplierOrders() : await getRetailerOrders();

      console.log('Fetched orders:', data);

      // Validate orders
      const validOrders = data.filter((order) => {
        if (!order?._id || order._id === '' || order._id === null) {
          console.warn('Invalid order (missing or empty _id):', order);
          return false;
        }
        return true;
      });

      // If newOrderId is present, check if it's in validOrders
      const newOrderId = state?.newOrderId;
      let finalOrders = validOrders;

      if (
        newOrderId &&
        !validOrders.some((order) => order._id === newOrderId) &&
        retryCount < maxRetries
      ) {
        console.log(
          `New order ${newOrderId} not found, retrying (${retryCount + 1}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s
        return fetchOrders(retryCount + 1, maxRetries);
      }

      // Fallback: Fetch specific order by newOrderId
      if (newOrderId && !validOrders.some((order) => order._id === newOrderId)) {
        console.log(`Attempting to fetch order ${newOrderId} directly`);
        try {
          const { data: newOrder } = await getOrderById(newOrderId);
          if (newOrder?._id && newOrder._id !== '' && newOrder._id !== null) {
            console.log('Fetched new order:', newOrder);
            finalOrders = [...validOrders, newOrder];
          } else {
            console.warn('Fetched order is invalid:', newOrder);
          }
        } catch (err) {
          console.error(`Failed to fetch order ${newOrderId}:`, err);
        }
      }

      setOrders(finalOrders);

      if (newOrderId && !finalOrders.some((order) => order._id === newOrderId)) {
        console.warn(`New order ${newOrderId} not found after retries and direct fetch`);
      }
    } catch (err) {
      console.error('Order fetch error:', err);
      setError('Failed to load orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user, state?.newOrderId]); // Re-fetch if newOrderId changes

  const filteredOrders =
    filter === 'all' ? orders : orders.filter((order) => order.status === filter);

  const getStatusCounts = () => {
    const counts = { all: orders.length };
    orders.forEach((order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="flex justify-between items-center mb-6">
            <div className="h-8 w-48 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-2 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
            ))}
          </div>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex justify-between mb-4">
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-200 rounded-full w-40"></div>
                    <div className="h-4 bg-gray-200 rounded-full w-60"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded-full w-24"></div>
                </div>
                <div className="space-y-3 mb-4">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="flex justify-between py-2">
                      <div className="h-4 bg-gray-200 rounded-full w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-center">Error Loading Orders</h2>
          <p className="text-gray-600 mb-8 text-center">{error}</p>
          <button
            onClick={() => fetchOrders()}
            className="w-full px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header with new design */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="mb-6 sm:mb-0">
            <h1 className="text-4xl font-bold mb-2 flex items-center">
              <span className="inline-block w-2 h-8 bg-black mr-3 rounded"></span>
              {user.role === 'supplier' ? 'Incoming' : 'Your'} Orders
            </h1>
            <p className="text-gray-600 pl-5">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}{' '}
              {filter !== 'all' ? `with status "${filter}"` : ''}
            </p>
          </div>

          {user.role === 'retailer' && (
            <button
              onClick={() => navigate('/orders/create')}
              className="flex items-center px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors gap-2 font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Create New Order
            </button>
          )}
        </div>

        {/* Filter tabs with new design */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === 'all'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
            }`}>
            All ({statusCounts.all || 0})
          </button>
          <button
            onClick={() => setFilter('Pending')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === 'Pending'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
            }`}>
            Pending ({statusCounts.Pending || 0})
          </button>
          <button
            onClick={() => setFilter('Accepted')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === 'Accepted'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
            }`}>
            Accepted ({statusCounts.Accepted || 0})
          </button>
          <button
            onClick={() => setFilter('Shipped')}
            className={`px-5 py-2.5 rounded-xl transition-all ${
              filter === 'Shipped'
                ? 'bg-black text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-black'
            }`}>
            Shipped ({statusCounts.Shipped || 0})
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white shadow-md p-12 text-center rounded-2xl">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
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
            </div>
            <h2 className="text-3xl font-bold mb-3">No Orders Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filter !== 'all'
                ? `You don't have any orders with the status "${filter}"`
                : user.role === 'supplier'
                ? 'No incoming orders yet'
                : 'You have not placed any orders yet'}
            </p>
            {user.role === 'retailer' && filter === 'all' && (
              <button
                onClick={() => navigate('/orders/create')}
                className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium">
                Create Your First Order
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                userRole={user.role}
                onRefresh={() => fetchOrders(0, 3)} // Pass retry params
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
