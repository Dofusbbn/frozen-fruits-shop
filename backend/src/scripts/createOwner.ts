import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const createOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/frozen-fruits');
    
    // Check if owner already exists
    let owner = await User.findOne({ email: 'owner@example.com' });
    
    if (!owner) {
      owner = await User.create({
        name: 'Store Owner',
        email: 'owner@example.com',
        password: 'owner123'
      });
      console.log('Owner created successfully');
    } else {
      console.log('Owner already exists');
    }
    
    console.log('Owner details:', {
      name: owner.name,
      email: owner.email
    });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

createOwner(); 