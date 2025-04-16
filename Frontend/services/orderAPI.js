import api from './api';
import axios
  from 'axios';

export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const getSupplierOrders = async () => {
  try {
    const response = await api.get('/orders/supplier');
    // console.log('Supplier orders response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('Error fetching supplier orders:', error);
    throw error;
  }
};

export const getRetailerOrders = async () => {
  try {
    const response = await api.get('/orders/retailer');
    // console.log('Retailer orders response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('Error fetching retailer orders:', error);
    throw error;
  }
};
export const getSuppliers = () => api.get('/users/suppliers');
// export const getSupplierInventory = (supplierId) => api.get(`/inventory/supplier/${supplierId}`);

export const getSupplierInventory = async (supplierId) => {
  try {
    console.log(supplierId);
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = userData.token; 
    console.log(token);
    const res = await axios.get(`http://localhost:5000/api/inventory/supplier/${supplierId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log(res.data);
    return res.data; // Return the data directly
  } catch (error) {
    console.log('Error fetching supplier inventory:', error);
    throw error; // Rethrow the error for further handling if needed
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you store the token in localStorage
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch order ${orderId}: ${error.message}`);
  }
};