import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = express.Router();

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt with:', req.body);
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    console.log('Found user:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('Login failed: User not found');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    console.log('Checking password...');
    const isValidPassword = await user.comparePassword(password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Login failed: Invalid password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', user.email);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

export default router;