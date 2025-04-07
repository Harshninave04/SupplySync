import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const isSupplier = (req, res, next) => {
  if (req.user && req.user.role === 'supplier') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as a supplier');
  }
};

const isRetailer = (req, res, next) => {
  if (req.user && req.user.role === 'retailer') {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as a retailer');
  }
}

export { protect, isSupplier, isRetailer };
