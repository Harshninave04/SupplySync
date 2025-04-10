import express from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get all suppliers
// @route   GET /api/users/suppliers
router.get('/suppliers', protect, async (req, res) => {
  try {
    const suppliers = await User.find({ role: 'supplier' }).select('-password');
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
