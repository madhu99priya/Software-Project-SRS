import Booking from "../models/Booking.js";
import User from "../models/UserModel.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { user, timeSlot } = req.body;

    // Create and save the new booking
    const booking = new Booking(req.body);
    await booking.save();

    // Extract the number of hours from the timeSlot (e.g., "8:00-9:00" -> 1 hour)
    const hoursBooked = 1; // Adjust this logic if time slots vary in length

    // If the user is not a guest, update the totalBookedHours for the user
    if (user !== "Guest") {
      const updatedUser = await User.findOneAndUpdate(
        { userId: user }, // Assuming 'user' is the userId
        { $inc: { totalBookedHours: hoursBooked } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).send({ error: "User not found" });
      }
    }

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

// controllers/bookingController.js

// Get all bookings for a user
export const getAllBookingsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId })

      .select("facility date timeSlot -_id") // Select the necessary fields
      .sort({ date: -1 }); // Sort by date, most recent first

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
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

export const getTotalBookedHours = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ user: userId });

    const totalHours = bookings.reduce((acc, booking) => {
      const [startHour, endHour] = booking.timeSlot
        .split("-")
        .map((time) => parseInt(time, 10));
      return acc + (endHour - startHour);
    }, 0);

    res.status(200).send({ totalHours });
  } catch (error) {
    res.status(500).send({ error: "Error calculating total booked hours" });
  }
};
