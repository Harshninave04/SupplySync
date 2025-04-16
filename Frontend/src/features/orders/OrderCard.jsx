import { useState } from 'react';
import { updateOrderStatus } from '../../../services/orderAPI';

const OrderCard = ({ order, userRole, onRefresh }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status || 'Pending');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-red-500">
        <div className="flex items-center gap-3">
          <div className="bg-red-100 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
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
          <div>
            <h3 className="font-bold text-gray-800">Invalid Order</h3>
            <p className="text-sm text-gray-500">
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
        return 'border-yellow-400 bg-yellow-50';
      case 'Accepted':
        return 'border-blue-400 bg-blue-50';
      case 'Shipped':
        return 'border-green-400 bg-green-50';
      case 'Cancelled':
        return 'border-red-400 bg-red-50';
      default:
        return 'border-gray-400 bg-gray-50';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Accepted':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
            className="h-4 w-4"
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
            className="h-4 w-4"
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
            className="h-4 w-4"
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

  return (
    <div className="mb-6">
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden border-l-4 ${getStatusColor(
          currentStatus,
        )} transition-all duration-300`}>
        {/* Header Section */}
        <div className="px-6 py-5 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-800">#{order._id.slice(-6)}</h3>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${getStatusBadgeColor(
                    currentStatus,
                  )}`}>
                  {getStatusIcon(currentStatus)}
                  {currentStatus}
                </div>
              </div>
              <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </p>
              <p className="text-lg font-bold text-gray-800">
                ${(order.totalAmount || 0).toFixed(2)}
              </p>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-gray-500 transition-transform ${
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

        {/* Info bar */}
        <div className="bg-gray-50 px-6 py-2 flex justify-between text-sm border-t border-gray-100">
          <div className="flex items-center gap-4">
            {userRole === 'supplier' && (
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
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
                <span className="text-gray-600">{order.retailer?.name || 'Unknown Retailer'}</span>
              </div>
            )}
            <div className="text-gray-600 font-mono text-xs">
              ID: {order._id.slice(0, 8)}...{order._id.slice(-8)}
            </div>
          </div>

          {userRole === 'supplier' && !isExpanded && (
            <div className="flex items-center gap-2">
              <select
                disabled={isUpdating}
                value={currentStatus}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <option value="Pending">Pending</option>
                <option value="Accepted">Accept</option>
                <option value="Shipped">Ship</option>
                <option value="Cancelled">Cancel</option>
              </select>
              {isUpdating && (
                <svg
                  className="animate-spin h-4 w-4 text-gray-500"
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
              )}
            </div>
          )}
        </div>

        {/* Expandable content */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-screen' : 'max-h-0'
          }`}>
          {/* Order items */}
          <div className="p-6 border-t border-gray-100">
            <h4 className="font-medium mb-4 text-gray-700 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Order Items
            </h4>

            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-800">
                          {item.product?.name || 'Unknown Product'}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-center">
                        <div className="text-sm text-gray-600">{item.quantity || 0}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="text-sm text-gray-600">${(item.price || 0).toFixed(2)}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <div className="text-sm font-medium text-gray-800">
                          ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-center text-sm text-gray-500">
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
                      className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      Order Total
                    </th>
                    <td className="px-4 py-3 text-right text-sm font-bold text-gray-800">
                      ${(order.totalAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="px-6 pb-6">
              <h4 className="font-medium mb-3 text-gray-700 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Shipping Address
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-700">
                {order.shippingAddress}
              </div>
            </div>
          )}

          {/* Action buttons */}
          {userRole === 'supplier' && (
            <div className="px-6 pb-6 flex justify-end gap-2">
              <select
                disabled={isUpdating}
                value={currentStatus}
                onChange={(e) => handleStatusUpdate(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                <option value="Pending">Pending</option>
                <option value="Accepted">Accept Order</option>
                <option value="Shipped">Mark as Shipped</option>
                <option value="Cancelled">Cancel Order</option>
              </select>
              {isUpdating && (
                <svg
                  className="animate-spin h-5 w-5 text-gray-500 mt-2"
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
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
