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
          <h1>
            <span className="previous">Previous</span>
            <span className="bookings"> Bookings</span>
          </h1>
        </section>
        <section className="table_body">
          {loading ? (
            <p>Loading...</p>
          ) : (
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
          )}
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
  padding: 2rem;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    max-height: 80vh;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    padding: 2rem;
    overflow-y: auto;
  }

  .table_header {
    width: 100%;
    padding-bottom: 1rem;
    text-align: left;
    border-bottom: 2px solid #ccc;
  }

  .table_header h1 {
    font-size: 1.8rem;
    font-weight: bold;
    margin: 0;
  }

  .table_header h1 .previous {
    color: black;
  }

  .table_header h1 .bookings {
    color: red;
  }

  .table_body {
    width: 100%;
    overflow-x: auto;
  }

  .table_body table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    font-size: 1rem;
  }

  table,
  th,
  td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    font-size : bold;

}
  



  thead th {
    position: sticky;
    top: 0;
    background-color: #f1f3f5;
    color: #495057;
    font-weight: bold;
    text-align: left;
    border-bottom: 2px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.7);
  }

  tbody tr:hover {
    background-color: #e9ecef;
  }

  tbody td {
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body::-webkit-scrollbar {
    width: 8px;
  }

  .table_body::-webkit-scrollbar-thumb {
    background-color: #ced4da;
    border-radius: 4px;
  }
`;
