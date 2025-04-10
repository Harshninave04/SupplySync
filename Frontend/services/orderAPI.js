import api from './api';
import axios from 'axios';

export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const getSupplierOrders = () => api.get('/orders/supplier');
export const getRetailerOrders = () => api.get('/orders/retailer');
export const getSuppliers = () => api.get('/users/suppliers');
// export const getSupplierInventory = (supplierId) => api.get(`/inventory/supplier/${supplierId}`);

export const getSupplierInventory = async (supplierId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/inventory/supplier/${supplierId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return res.data; // Return the data directly
  } catch (error) {
    console.log('Error fetching supplier inventory:', error);
    throw error; // Rethrow the error for further handling if needed
  }
}; 