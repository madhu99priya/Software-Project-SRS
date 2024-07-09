
import { Router } from 'express';
import UserModel from '../models/UserModel.js';
import Booking from '../models/Booking.js';
import { verifyAdmin } from '../middleware/authMiddleware.js';

const router = Router();


router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/bookings', verifyAdmin, async (req, res) => {
  try {
    const reservations = await Booking.find().populate('user');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
