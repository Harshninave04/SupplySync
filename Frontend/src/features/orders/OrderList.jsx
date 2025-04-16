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
  const { state } = useLocation(); // Access navigation state

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
       console.log(`New order ${newOrderId} not found, retrying (${retryCount + 1}/${maxRetries})`);
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
          <div className="flex items-center mb-8">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between mb-6">
                  <div className="space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="space-y-4 mb-6">
                  {[...Array(2)].map((_, j) => (
                    <div key={j} className="flex justify-between py-3 border-b">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between">
                  <div className="h-5 bg-gray-200 rounded w-24"></div>
                  <div className="h-8 bg-gray-200 rounded w-32"></div>
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
        <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-500"
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
          <h2 className="text-2xl font-bold mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchOrders()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {user.role === 'supplier' ? 'Incoming' : 'Your'} Orders
            </h1>
            <p className="text-gray-600">
              {filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'}{' '}
              {filter !== 'all' ? `with status "${filter}"` : ''}
            </p>
          </div>

          {user.role === 'retailer' && (
            <button
              onClick={() => navigate('/orders/create')}
              className="mt-4 sm:mt-0 flex items-center px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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

        <div className="mb-6 bg-white rounded-lg p-1 inline-flex shadow-sm">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md ${
              filter === 'all' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}>
            All ({statusCounts.all || 0})
          </button>
          <button
            onClick={() => setFilter('Pending')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Pending' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}>
            Pending ({statusCounts.Pending || 0})
          </button>
          <button
            onClick={() => setFilter('Accepted')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Accepted' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}>
            Accepted ({statusCounts.Accepted || 0})
          </button>
          <button
            onClick={() => setFilter('Shipped')}
            className={`px-4 py-2 rounded-md ${
              filter === 'Shipped' ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-100'
            } transition-colors`}>
            Shipped ({statusCounts.Shipped || 0})
          </button>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="bg-white shadow-sm p-12 text-center rounded-xl">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
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
            <h2 className="text-2xl font-bold mb-2">No Orders Found</h2>
            <p className="text-gray-600 mb-6">
              {filter !== 'all'
                ? `You don't have any orders with the status "${filter}"`
                : user.role === 'supplier'
                ? 'No incoming orders yet'
                : 'You have not placed any orders yet'}
            </p>
            {user.role === 'retailer' && filter === 'all' && (
              <button
                onClick={() => navigate('/orders/create')}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
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
