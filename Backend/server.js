import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'; // Import user routes
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json()); // Parse JSON bodies


// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
  }),
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/users', userRoutes)

// Error Handler Middleware (must be after routes)
app.use(errorHandler);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Basic Route
app.get('/', (req, res) => {
  res.send('SupplySync Backend is running!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
