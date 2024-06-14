import express from 'express';
import mongoose from 'mongoose';
import bookingRoutes from './src/routes/booking.js';
import memberRoutes from './src/routes/member.js'

const app = express();


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
app.use('/api/members', memberRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
