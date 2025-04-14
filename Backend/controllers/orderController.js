import Order from '../models/Order.js';
import Inventory from '../models/Inventory.js';

// @desc    Create new order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, supplierId, shippingAddress } = req.body;

    // Validate inventory items
    const inventoryItems = await Inventory.find({
      _id: { $in: items.map((item) => item.product) },
      supplier: supplierId,
    });

    if (inventoryItems.length !== items.length) {
      return res.status(400).json({ message: 'Invalid items in order' });
    }

    // Calculate total
    const totalAmount = items.reduce((total, item) => {
      const product = inventoryItems.find((p) => p._id.equals(item.product));
      return total + product.price * item.quantity;
    }, 0);

    const order = await Order.create({
      retailer: req.user._id,
      supplier: supplierId,
      items: items.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: inventoryItems.find((p) => p._id.equals(item.product)).price,
      })),
      totalAmount,
      shippingAddress,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update order status
// @route   PATCH /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, supplier: req.user._id },
      { status: req.body.status },
      { new: true },
    ).populate('retailer', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all orders for supplier
// @route   GET /api/orders/supplier
const getSupplierOrders = async (req, res) => {
  try {
    const orders = await Order.find({ supplier: req.user._id })
      .populate('retailer', 'name email') // optional, enrich data
      .populate('items.product', 'name') // optional, enrich data
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get all orders for retailer
// @route   GET /api/orders/retailer
const getRetailerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ retailer: req.user._id })
      .populate('supplier', 'name email') // optional
      .populate('items.product', 'name') // optional, enrich data
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createOrder, updateOrderStatus, getSupplierOrders, getRetailerOrders };  