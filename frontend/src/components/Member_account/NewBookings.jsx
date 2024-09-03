import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewBookings.css";
import Modal from "../../components/Modal/Modal.jsx";
import Payment from "../OnlineReservations/Payment.jsx";

const NewBookings = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [bookings, setBookings] = useState([]);
  const [confirmation, setConfirmation] = useState({
    court: null,
    timeSlot: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
  const [requiresPayment, setRequiresPayment] = useState(false);

  useEffect(() => {
    fetchUserDetails();
    fetchBookings();
  }, [selectedDate]);

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3000/api/users/userId/${userId}`);
      setUser(response.data);
      setRequiresPayment(!response.data.membershipType); // Requires payment if membershipType is not set
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookings");
      const filteredBookings = response.data.filter(
        (booking) =>
          new Date(booking.date).toISOString().split("T")[0] === selectedDate
      );
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSlotClick = (court, timeSlot) => {
    setConfirmation({ court, timeSlot });
    setShowModal(true);
  };

  const confirmBooking = async () => {
    try {
      const newBooking = {
        user: user.userId,
        facility: `Court ${confirmation.court}`,
        date: selectedDate,
        timeSlot: confirmation.timeSlot,
      };
      await axios.post("http://localhost:3000/api/bookings", newBooking);

      setBookings([...bookings, newBooking]);

      setShowModal(false);
      setConfirmation({ court: null, timeSlot: null });
      console.log("Booking was created successfully");
    } catch (error) {
      console.error("Error creating booking", error);
    }
  };

  const isSlotBooked = (court, timeSlot) => {
    return bookings.some(
      (booking) =>
        booking.facility === `Court ${court}` && booking.timeSlot === timeSlot
    );
  };

  const renderSlots = () => {
    const timeSlots = [];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    for (let hour = 8; hour <= 20; hour++) {
      const timeSlot = `${hour}:00-${hour + 1}:00`;
      const isPast =
        selectedDate === getCurrentDate() &&
        (hour < currentHour || (hour === currentHour && currentMinutes >= 0));
      timeSlots.push({ timeSlot, isPast });
    }

    return timeSlots.map(({ timeSlot, isPast }, index) => (
      <div key={index} className="time-slot">
        <div className="time">{timeSlot}</div>
        {[1, 2, 3, 4].map((court) => {
          const isSlotCurrentlyBooked = isSlotBooked(court, timeSlot);
          const isPastBooked = isSlotCurrentlyBooked && isPast;
          const isDisabled = isPast || isSlotCurrentlyBooked;

          return (
            <div
              key={court}
              className={`court ${
                isPastBooked
                  ? "past-booked"
                  : isSlotCurrentlyBooked
                  ? "booked"
                  : isPast
                  ? "past"
                  : "available"
              }`}
              onClick={() => !isDisabled && handleSlotClick(court, timeSlot)}
            >
              {isPastBooked
                ? "Booked"
                : isSlotCurrentlyBooked
                ? "Booked"
                : isPast
                ? "Past"
                : "Available"}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="newBookings_background">
      <div className="online-reservations-m">
        <h1>
          Online <span className="res_h">Reservations</span>
        </h1>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-selector"
          min={getCurrentDate()}
        />
        <div className="slots">
          <div className="slot-header">
            <div className="time">Time Slot</div>
            <div className="court">Court 1</div>
            <div className="court">Court 2</div>
            <div className="court">Court 3</div>
            <div className="court">Court 4</div>
          </div>
          {renderSlots()}
        </div>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            {requiresPayment ? (
              <Payment
                setShowModal={() => setShowModal(false)}
                confirmBooking={confirmBooking}
              />
            ) : (
              <div className="modal-content">
                <p>
                  Confirm booking for Court {confirmation.court} at{" "}
                  {confirmation.timeSlot} on {selectedDate}?
                </p>
                <div className="modal-buttons">
                  <button onClick={confirmBooking}>Confirm Booking</button>
                  <button
                    className="cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default NewBookings;
