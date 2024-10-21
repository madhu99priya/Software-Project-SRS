import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getTotalBookedHours,
  getAllBookingsForUser,
  getCourtBookingCount,
  getBookingsByTimeSlot,
  getBookingsByTimeSlotForCourt,
  getCourtBookingCountByTimeSlot,
} from "../controllers/bookingController.js";

const router = express.Router();

// Create a new booking
router.post("/", createBooking);

// Get all bookings
router.get("/", getAllBookings);

// In bookingRoutes.js
router.get("/court-bookings", getCourtBookingCount);

router.get("/time-slot-bookings", getBookingsByTimeSlot);

// In bookingRoutes.js
router.get(
  "/court/:courtName/time-slot-bookings",
  getBookingsByTimeSlotForCourt
);

// Get a booking by ID
router.get("/:id", getBookingById);

// Update a booking
router.put("/:id", updateBooking);

// Delete a booking
router.delete("/:id", deleteBooking);

// Get tot booked hours
router.get("/totalHours/:userId", getTotalBookedHours);

router.get("/user/:userId/bookings", getAllBookingsForUser);

router.get("/court/count-by-timeslot/:court", getCourtBookingCountByTimeSlot);

export default router;
