import mongoose from 'mongoose';
import User from './models/User.js';
import Inventory from './models/Inventory.js';
import dotenv from 'dotenv';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Clear existing data
    await User.deleteMany();
    await Inventory.deleteMany();

    // Create test supplier
    const supplier = await User.create({
      name: 'Test Supplier',
      email: 'supplier@test.com',
      password: '123456',
      role: 'supplier',
    });

    // Create test retailer
    const retailer = await User.create({
      name: 'Test Retailer',
      email: 'retailer@test.com',
      password: '123456',
      role: 'retailer',
    });

    // Add sample inventory
    await Inventory.create([
      {
        supplier: supplier._id,
        name: 'Premium Widget',
        description: 'High-quality widget',
        category: 'Widgets',
        price: 29.99,
        quantity: 100,
      },
      {
        supplier: supplier._id,
        name: 'Basic Gadget',
        description: 'Entry-level gadget',
        category: 'Gadgets',
        price: 12.5,
        quantity: 250,
      },
    ]);

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
export default seedDatabase;