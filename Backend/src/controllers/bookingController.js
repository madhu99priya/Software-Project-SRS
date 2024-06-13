import Booking from '../models/Booking.js';

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).send();
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) {
      return res.status(404).send();
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send();
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};
