// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Onlinereservations.css';

// const OnlineReservations = () => {
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [reservations, setReservations] = useState([]);

//   useEffect(() => {
//     const fetchReservations = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/api/reservations?date=${date}`);
//         setReservations(response.data);
//       } catch (error) {
//         console.error('Error fetching reservations:', error);
//       }
//     };
//     fetchReservations();
//   }, [date]);

//   const timeSlots = [
//     '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
//     '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
//     '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', 
//     '08:00 PM', '09:00 PM'
//   ];

//   const courts = ['Court 01', 'Court 02', 'Court 03', 'Court 04'];

//   return (
//     <div className="online-reservations">
//       <h1>Online Reservations</h1>
//       <div className="date-picker">
//         <input 
//           type="date" 
//           value={date} 
//           onChange={(e) => setDate(e.target.value)} 
//         />
//       </div>
//       <div className="courts">
//         <div className="courts-header">
//           {courts.map(court => (
//             <div key={court} className="court-title">{court}</div>
//           ))}
//         </div>
//         <div className="time-slots">
//           {timeSlots.map(time => (
//             <div key={time} className="time-slot">
//               <div className="time-slot-title">{time}</div>
//               {courts.map(court => {
//                 const reservation = reservations.find(res => 
//                   res.timeSlot === time && res.facility === court
//                 );
//                 return (
//                   <div key={court} className={`court-reservation ${reservation ? '' : 'empty'}`}>
//                     {reservation ? reservation.user : 'Available'}
//                   </div>
//                 );
//               })}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnlineReservations;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Onlinereservations.css";
import Modal from "../../components/Modal/Modal.jsx";

const OnlineReservations = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [confirmation, setConfirmation] = useState({
    court: null,
    timeSlot: null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (selectedDate) {
      fetchBookings();
    }
  }, [selectedDate]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookings");
      setBookings(
        response.data.filter((booking) => booking.date === selectedDate)
      );
      console.log("Booking was created!...");
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
        user: "UserID", // replace with actual user id
        facility: `Court ${confirmation.court}`,
        date: selectedDate,
        timeSlot: confirmation.timeSlot,
      });
      fetchBookings();
      setShowModal(false);
      setConfirmation({ court: null, timeSlot: null });
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
        {[1, 2, 3, 4].map((court) => (
          <div
            key={court}
            className={`court ${
              isSlotBooked(court, timeSlot) ? "booked" : "available"
            }`}
            onClick={() =>
              !isSlotBooked(court, timeSlot) && handleSlotClick(court, timeSlot)
            }
          >
            {isSlotBooked(court, timeSlot) ? "Booked" : "Available"}
          </div>
        ))}
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
          <button className = "confirm_btn" onClick={confirmBooking}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );
};

export default OnlineReservations;

