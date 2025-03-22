import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Error Handler Middleware
app.use(errorHandler);

// Routes
app.use('/api/auth', authRoutes)


// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Basic Route
app.get('/', (req, res) => {
  res.send('SupplySync Backend is running!');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
