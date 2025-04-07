import express from 'express';
import { createOrder, updateOrderStatus } from '../controllers/orderController.js';
import { protect, isRetailer, isSupplier } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, isRetailer, createOrder);
router.patch('/:id/status', protect, isSupplier, updateOrderStatus);

export default router;
