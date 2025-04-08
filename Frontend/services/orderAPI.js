import api from './api';

export const createOrder = (orderData) => api.post('/orders', orderData);
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const getSupplierOrders = () => api.get('/orders/supplier');
export const getRetailerOrders = () => api.get('/orders/retailer');
