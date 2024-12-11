import express, { Request, Response } from 'express';
import Order from '../models/Order';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('customerId')
      .populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: 'Error creating order' });
  }
});

export default router;
