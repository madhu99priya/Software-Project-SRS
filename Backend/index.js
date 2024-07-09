import express from 'express';
import mongoose from 'mongoose';
import bookingRoutes from './src/routes/booking.js';
import userRoutes from './src/routes/userroute.js'
import adminRoutes from './src/routes/admin.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

mongoose.connect('mongodb://localhost:27017/sports-complex')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


app.use('/api/bookings', bookingRoutes);
app.use('/api/users',userRoutes);
app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
