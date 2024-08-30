import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Background from '../../../assets/background_bookings.jpg';

const PreviousBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); 

  useEffect(() => {
    const fetchUserId = () => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };

    const fetchBookings = async () => {
      if (userId) {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/bookings/user/${userId}/bookings`);
          setBookings(response.data);
        } catch (error) {
          console.error('Error fetching bookings:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserId();
    fetchBookings();
  }, [userId]);

  return (
    <Section>
      <div className="table-container">
        <section className="table_header">
          <h1>Previous Bookings</h1>
        </section>
        <section className="table_body">
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Booking Date</th>
                <th>Court No</th>
                <th>Time Slot</th>
                <th>Created Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>{booking.facility}</td>
                  <td>{booking.timeSlot}</td>
                  <td>{new Date(booking.createdAt).toLocaleDateString()}</td> 
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </Section>
  );
};

export default PreviousBookings;

const Section = styled.section`
  color: black;
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65vw;
    max-height: 90vh;
    background-color: rgba(255, 255, 255, 0.8); /* Slightly less transparent */
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border-radius: 1rem;
    overflow: hidden;
    padding: 1rem;
  }

  .table_header {
    width: 100%;
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  .table_header h1 {
    font-size: 1.6rem;
    font-weight: bold;
    margin: 0;
  }

  .table_body {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .table_body table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  table,
  th,
  td {
    padding: 1rem;
    border: 1px solid #ddd;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #f8f9fa;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(250, 250, 250, 0.5);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body::-webkit-scrollbar-thumb {
    border-radius: 0.5rem;
    background-color: #0004;
  }
`;
