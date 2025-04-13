import { useState } from 'react';
import { updateOrderStatus } from '../../../services/orderAPI';

const OrderCard = ({ order, userRole }) => {
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusUpdate = async (newStatus) => {
    try {
      setIsUpdating(true);
      await updateOrderStatus(order._id, newStatus);
      setCurrentStatus(newStatus);
    } catch (err) {
      console.error('Status update failed', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold">Order #{order._id.slice(-6)}</h3>
          <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            currentStatus === 'Pending'
              ? 'bg-yellow-100 text-yellow-800'
              : currentStatus === 'Accepted'
              ? 'bg-blue-100 text-blue-800'
              : currentStatus === 'Shipped'
              ? 'bg-purple-100 text-purple-800'
              : 'bg-green-100 text-green-800'
          }`}>
          {currentStatus}
        </span>
      </div>

      <div className="mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b">
            <div>
              <p>{item.name}</p>
              <p className="text-sm text-gray-600">
                {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold">Total: ${order.totalAmount.toFixed(2)}</p>

        {userRole === 'supplier' && (
          <select
            value={currentStatus}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            disabled={isUpdating}
            className="px-3 py-1 border rounded disabled:opacity-50">
            <option value="Pending">Pending</option>
            <option value="Accepted">Accept</option>
            <option value="Shipped">Mark as Shipped</option>
            <option value="Cancelled">Cancel</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
