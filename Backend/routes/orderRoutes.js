import express from 'express';
import { createOrder, getRetailerOrders, getSupplierOrders, updateOrderStatus } from '../controllers/orderController.js';
import { protect, isRetailer, isSupplier } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/supplier', protect, isSupplier, getSupplierOrders);
router.get('/retailer', protect, isRetailer, getRetailerOrders);
router.post('/', protect, isRetailer, createOrder);
router.patch('/:id/status', protect, isSupplier, updateOrderStatus);

export default router;
