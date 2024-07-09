import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Onlinereservations.css";
import Modal from "../../components/Modal/Modal.jsx";
import Payment from "./Payment.jsx";

const OnlineReservations = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [confirmation, setConfirmation] = useState({
    court: null,
    timeSlot: null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, [selectedDate]);

  useEffect(() => {
    // Save bookings to localStorage whenever bookings state changes
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookings");
      const filteredBookings = response.data.filter(
        (booking) => booking.date === selectedDate
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
      await axios.post("http://localhost:3000/api/bookings", {
        user: "UserID",
        facility: `Court ${confirmation.court}`,
        date: selectedDate,
        timeSlot: confirmation.timeSlot,
      });

      // Update bookings state to include the new booking
      const newBooking = {
        user: "UserID",
        facility: `Court ${confirmation.court}`,
        date: selectedDate,
        timeSlot: confirmation.timeSlot,
      };
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
    for (let hour = 8; hour <= 20; hour++) {
      timeSlots.push(`${hour}:00-${hour + 1}:00`);
    }

    return timeSlots.map((timeSlot, index) => (
      <div key={index} className="time-slot">
        <div className="time">{timeSlot}</div>
        {[1, 2, 3, 4].map((court) => {
          const isSlotCurrentlyBooked = isSlotBooked(court, timeSlot);
          return (
            <div
              key={court}
              className={`court ${
                isSlotCurrentlyBooked ? "booked" : "available"
              }`}
              onClick={() =>
                !isSlotCurrentlyBooked && handleSlotClick(court, timeSlot)
              }
            >
              {isSlotCurrentlyBooked ? "Booked" : "Available"}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="online-reservations">
      <h2>Online Reservations</h2>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
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
          <p>
            Confirm booking for Court {confirmation.court} at{" "}
            {confirmation.timeSlot}?
          </p>
          {/* <button className="confirm_btn" onClick={confirmBooking}>
            Confirm
          </button> */}
          <Payment
            setShowModal={() => {
              setShowModal(false);
            }}
            confirmBooking={confirmBooking}
          />
        </Modal>
      )}
    </div>
  );
};

export default OnlineReservations;
