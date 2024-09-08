import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "antd";
import "./Notifications.css";

// Function to format date
function formatDate(dateString) {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function calculateRemainingDays(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset today's time to 00:00:00 to compare only dates
  // today.getDate();
  const bookingDate = new Date(dateString);
  bookingDate.setHours(0, 0, 0, 0); // Reset booking time to 00:00:00 to compare only dates
  const differenceInTime = bookingDate - today;

  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
}

// Define the getBookings function here
async function getBookings() {
  try {
    const storedUserId = localStorage.getItem("userId");
    const response = await fetch(
      `http://localhost:3000/api/bookings/user/${storedUserId}/bookings`
    ); // Replace with your actual API endpoint
    const text = await response.text(); // Get the response as text
    console.log("Raw response:", text); // Log the raw response

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    // Try to parse the text as JSON
    const data = JSON.parse(text);
    return { data };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { data: [] }; // Return an empty array or handle error accordingly
  }
}

function Notifications() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      const response = await getBookings();
      const upcomingBookings = response.data
        .filter((booking) => {
          const daysRemaining = calculateRemainingDays(booking.date);
          return daysRemaining >= 0 && daysRemaining <= 4; // Show bookings within the next 4 days
        })
        .sort(
          (a, b) =>
            calculateRemainingDays(a.date) - calculateRemainingDays(b.date)
        ); // Sort by remaining days (lower to higher)

      setBookings(upcomingBookings);
    }
    fetchBookings();
  }, []);

  return (
    <Row gutter={16} className="notifications-container">
      {/* Reminders Section */}
      <Col span={12}>
        <Card title="Reminders 🔔" className="card">
          {bookings.length > 0 ? (
            <div className="booking-card-grid">
              {bookings.map((booking, index) => (
                <div key={index} className="booking-card">
                  <p>
                    <strong>Date:</strong> {formatDate(booking.date)}
                  </p>
                  <p>
                    <strong>Court:</strong> {booking.facility}
                  </p>
                  <p>
                    <strong>Time Slot:</strong> {booking.timeSlot}
                  </p>
                  <p>
                    <strong>Days Remaining:</strong>{" "}
                    {calculateRemainingDays(booking.date)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <Card className="not-card">
              <p>No Reminders</p>
            </Card>
          )}
        </Card>
      </Col>
      {/* System Notifications Section */}
      <Col span={12}>
        <Card title="System Notifications 🗣📢" className="card">
          {/* Add your system notifications here */}
          <Card className="not-card">
            <p>No new notifications</p>
          </Card>
        </Card>
      </Col>
    </Row>
  );
}

export default Notifications;
