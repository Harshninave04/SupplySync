import { useState } from 'react';
import { updateOrderStatus } from '../../../services/orderAPI';

const OrderCard = ({ order, userRole, onRefresh }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status || 'Pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Log the full order prop
  console.log('OrderCard received order:', order);

  // Validate order._id
  const isValidOrder = order && order._id && order._id !== '' && order._id !== null;
  if (!isValidOrder) {
    console.warn('OrderCard received invalid order (missing or empty _id):', order);
  }

  const handleStatusUpdate = async (newStatus) => {
    if (!isValidOrder) {
      console.error('Cannot update status: Order ID is invalid');
      return;
    }
    try {
      setIsUpdating(true);
      await updateOrderStatus(order._id, newStatus);
      setCurrentStatus(newStatus);
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      console.error('Status update failed', err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Fallback if order is invalid
  if (!isValidOrder) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
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
          <div>
            <h3 className="font-bold text-lg text-red-700">Invalid Order</h3>
            <p className="text-sm text-gray-600">
              Order ID is missing or invalid. Please contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'Accepted':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Shipped':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-800 border-red-200';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'Accepted':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'Shipped':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        );
      case 'Cancelled':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Calculate total items
  const totalItems = order.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Format date with day name
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return dateString ? new Date(dateString).toLocaleDateString(undefined, options) : 'N/A';
  };

  // Fallback if order._id is missing
  if (!order?._id) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-red-200">
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-red-500"
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
          <div>
            <h3 className="font-bold text-lg text-red-700">Invalid Order</h3>
            <p className="text-sm text-gray-600">Order ID is missing. Please contact support.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200">
      <div className="border-b border-gray-100">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-bold text-lg">Order #{order._id.slice(-6)}</h3>
                <span
                  className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center ${getStatusColor(
                    currentStatus,
                  )}`}>
                  {getStatusIcon(currentStatus)}
                  {currentStatus}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(order.createdAt)}
                </div>

                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1.5"
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
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </div>

                {userRole === 'supplier' && (
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {order.retailer?.name || 'Unknown Retailer'}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-bold text-lg">${(order.totalAmount || 0).toFixed(2)}</div>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${
                    isExpanded ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}>
        <div className="p-6">
          <div className="mb-6">
            <h4 className="font-medium mb-3 text-gray-700">Order Items</h4>
            <div className="rounded-lg border overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.product?.name || 'Unknown Product'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-900">{item.quantity || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-900">${(item.price || 0).toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-medium">
                          ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                        No items available
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th
                      scope="row"
                      colSpan="3"
                      className="px-6 py-3 text-right text-sm font-medium text-gray-900">
                      Order Total
                    </th>
                    <td className="px-6 py-3 text-right text-sm font-bold">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {order.shippingAddress && (
            <div className="mb-6">
              <h4 className="font-medium mb-2 text-gray-700">Shipping Address</h4>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                {order.shippingAddress}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t">
            <div className="text-sm text-gray-500">Order ID: {order._id}</div>

            {userRole === 'supplier' && (
              <div className="relative">
                <select
                  value={currentStatus}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  disabled={isUpdating || !order._id}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:opacity-50">
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accept Order</option>
                  <option value="Shipped">Mark as Shipped</option>
                  <option value="Cancelled">Cancel Order</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
                {isUpdating && (
                  <div className="absolute right-0 top-0 mt-2 mr-10">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
