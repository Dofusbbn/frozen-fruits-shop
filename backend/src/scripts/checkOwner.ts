import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const checkOwner = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/frozen-fruits');
    
    const owner = await User.findOne({ email: 'owner@example.com' });
    console.log('Owner exists:', owner ? 'Yes' : 'No');
    if (owner) {
      console.log('Owner details:', {
        name: owner.name,
        email: owner.email,
        lastLogin: owner.lastLogin
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

checkOwner(); 