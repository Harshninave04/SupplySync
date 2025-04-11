import express from 'express';
import asyncHandler from 'express-async-handler';
import Inventory from '../models/Inventory.js';
import { protect, isSupplier, isRetailer } from '../middleware/authMiddleware.js'; // Add auth middleware later

const router = express.Router();

// Apply to all routes
router.use(protect);

// @desc    Get all inventory items for a supplier
// @route   GET /api/inventory
// @access  Private (Supplier only)
router.get(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const inventory = await Inventory.find({ supplier: req.user._id });
    res.json(inventory);
  }),
);

router.get('/supplier/:supplierId', protect, isRetailer, async (req, res) => {
  try {
    console.log('Fetching inventory for supplier:', req.params.supplierId);
    const inventory = await Inventory.find({ supplier: req.params.supplierId });
    console.log('Inventory found:', inventory);
    res.json(inventory);
  } catch (error) {
    console.error('Error fetching inventory:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Add a new inventory item
// @route   POST /api/inventory
// @access  Private (Supplier only)
router.post(
  '/',
  protect,
  asyncHandler(async (req, res) => {
    const { name, description, category, price, quantity } = req.body;

    const newItem = await Inventory.create({
      supplier: req.user._id,
      name,
      description,
      category,
      price,
      quantity,
    });

    res.status(201).json(newItem);
  }),
);

export default router;
