// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Onlinereservations.css";
// import Modal from "../../components/Modal/Modal.jsx";
// import Payment from "./Payment.jsx";

// const OnlineReservations = () => {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [confirmation, setConfirmation] = useState({
//     court: null,
//     timeSlot: null,
//   });
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchBookings();
//   }, [selectedDate]);

//   useEffect(() => {
//     // Save bookings to localStorage whenever bookings state changes
//     localStorage.setItem("bookings", JSON.stringify(bookings));
//   }, [bookings]);

//   const fetchBookings = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/api/bookings");
//       const filteredBookings = response.data.filter(
//         (booking) => booking.date === selectedDate
//       );
//       setBookings(filteredBookings);
//     } catch (error) {
//       console.error("Error fetching bookings", error);
//     }
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   const handleSlotClick = (court, timeSlot) => {
//     setConfirmation({ court, timeSlot });
//     setShowModal(true);
//   };

//   const confirmBooking = async () => {
//     try {
//       await axios.post("http://localhost:3000/api/bookings", {
//         user: "UserID",
//         facility: `Court ${confirmation.court}`,
//         date: selectedDate,
//         timeSlot: confirmation.timeSlot,
//       });

//       // Update bookings state to include the new booking
//       const newBooking = {
//         user: "UserID",
//         facility: `Court ${confirmation.court}`,
//         date: selectedDate,
//         timeSlot: confirmation.timeSlot,
//       };
//       setBookings([...bookings, newBooking]);

//       setShowModal(false);
//       setConfirmation({ court: null, timeSlot: null });
//       console.log("Booking was created successfully");
//     } catch (error) {
//       console.error("Error creating booking", error);
//     }
//   };

//   const isSlotBooked = (court, timeSlot) => {
//     return bookings.some(
//       (booking) =>
//         booking.facility === `Court ${court}` && booking.timeSlot === timeSlot
//     );
//   };

//   const renderSlots = () => {
//     const timeSlots = [];
//     for (let hour = 8; hour <= 20; hour++) {
//       timeSlots.push(`${hour}:00-${hour + 1}:00`);
//     }

//     return timeSlots.map((timeSlot, index) => (
//       <div key={index} className="time-slot">
//         <div className="time">{timeSlot}</div>
//         {[1, 2, 3, 4].map((court) => {
//           const isSlotCurrentlyBooked = isSlotBooked(court, timeSlot);
//           return (
//             <div
//               key={court}
//               className={`court ${
//                 isSlotCurrentlyBooked ? "booked" : "available"
//               }`}
//               onClick={() =>
//                 !isSlotCurrentlyBooked && handleSlotClick(court, timeSlot)
//               }
//             >
//               {isSlotCurrentlyBooked ? "Booked" : "Available"}
//             </div>
//           );
//         })}
//       </div>
//     ));
//   };

//   return (
//     <div className="online-reservations">
//       <h1>Online Reservations</h1>
//       <input type="date" value={selectedDate} onChange={handleDateChange} />
//       <div className="slots">
//         <div className="slot-header">
//           <div className="time">Time Slot</div>
//           <div className="court">Court 1</div>
//           <div className="court">Court 2</div>
//           <div className="court">Court 3</div>
//           <div className="court">Court 4</div>
//         </div>
//         {renderSlots()}
//       </div>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <p>
//             Confirm booking for Court {confirmation.court} at{" "}
//             {confirmation.timeSlot}?
//           </p>
//           {/* <button className="confirm_btn" onClick={confirmBooking}>
//             Confirm
//           </button> */}
//           <Payment
//             setShowModal={() => {
//               setShowModal(false);
//             }}
//             confirmBooking={confirmBooking}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default OnlineReservations;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Onlinereservations.css";
import Modal from "../../components/Modal/Modal.jsx";
import Payment from "./Payment.jsx";

const OnlineReservations = () => {

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [selectedDate, setSelectedDate] = useState(getCurrentDate());

//   const [selectedDate, setSelectedDate] = useState(""); // Initialize with an empty string
  const [bookings, setBookings] = useState([]);
  const [confirmation, setConfirmation] = useState({
    court: null,
    timeSlot: null,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Initialize selectedDate state with today's date when the component mounts
    const today = new Date();
    const isoDate = today.toISOString().split("T")[0]; // Get today's date in ISO format
    setSelectedDate(isoDate);
    fetchBookings(isoDate); // Fetch bookings for today's date initially
  }, []);


  const fetchBookings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/bookings");
      const filteredBookings = response.data.filter(
        (booking) =>
          new Date(booking.date).toISOString().split("T")[0] === selectedDate
      );
      console.log("Filtered bookings:", filteredBookings);
      setBookings(filteredBookings);
//   useEffect(() => {
//     // Save bookings to localStorage whenever bookings state changes
//     localStorage.setItem("bookings", JSON.stringify(bookings));
//   }, [bookings]);

//   const fetchBookings = async (date) => {
//     try {
//       const response = await axios.get(`http://localhost:3000/api/bookings?date=${date}`);
//       setBookings(response.data);

    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const handleDateChange = (e) => {
    const selected = new Date(e.target.value);
    const currentDate = new Date();

    // Allow selection only for future dates or today
    if (selected >= currentDate) {
      const isoDate = selected.toISOString().split("T")[0];
      setSelectedDate(isoDate);
      fetchBookings(isoDate); // Fetch bookings for the selected date
    } else {
      alert("Please select a future date or today.");
      setSelectedDate(new Date().toISOString().split("T")[0]); // Reset selected date to today
      fetchBookings(new Date().toISOString().split("T")[0]); // Fetch bookings for today's date
    }
  };

  const handleSlotClick = (court, timeSlot) => {
    setConfirmation({ court, timeSlot });
    setShowModal(true);
  };

  const confirmBooking = async () => {
    try {
      const newBooking = {
        user: "UserID",
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
      <h1>Online Reservations</h1>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="date-selector"
        min={new Date().toISOString().split("T")[0]} // Set min date to today's date
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
          <p>
            Confirm booking for Court {confirmation.court} at{" "}
            {confirmation.timeSlot}?
          </p>
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
