import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchDate, setSearchDate] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/bookings"); // Adjust API route
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  // Convert date to YYYY-MM-DD format
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Group reservations by date
  const groupedByDate = reservations.reduce((acc, reservation) => {
    const dateKey = formatDate(reservation.date);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(reservation);
    return acc;
  }, {});

  // Calculate total booked hours for each day
  const calculateTotalBookedHours = (reservations) => {
    return reservations.length; // Assuming each reservation is for 1 hour
  };

  // Filtered reservations based on search date
  const filteredReservations = searchDate
    ? groupedByDate[searchDate] ? { [searchDate]: groupedByDate[searchDate] } : {}
    : groupedByDate;

  return (
    <Section>
      <div className="table-container">
        <section className="table_header">
          <h1>
            <span className="reservations">Reservations</span>
            <span className="list"> List</span>
          </h1>
          <SearchContainer>
            <input
              type="date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              placeholder="Search by date"
            />
          </SearchContainer>
        </section>
        <section className="table_body">
          {loading ? (
            <p>Loading...</p>
          ) : (
            Object.keys(filteredReservations).length === 0 ? (
              <p>No reservations found for the selected date.</p>
            ) : (
              Object.keys(filteredReservations).map((date) => (
                <div key={date} className="date-section">
                  <h2>{date}</h2>
                  <p>Total Booked Hours: {calculateTotalBookedHours(filteredReservations[date])}</p>
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>User</th>
                        <th>Facility</th>
                        <th>Time Slot</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations[date].map((reservation, index) => (
                        <tr key={reservation._id}>
                          <td>{index + 1}</td>
                          <td>{reservation.user}</td>
                          <td>{reservation.facility}</td>
                          <td>{reservation.timeSlot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))
            )
          )}
        </section>
      </div>
    </Section>
  );
};

export default Reservations;

const Section = styled.section`
  color: black;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  .table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80vw;
    max-height: 80vh;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
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

  .table_header h1 .reservations {
    color: black;
  }

  .table_header h1 .list {
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
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }

  table,
  th,
  td {
    padding: 0.8rem;
    border: 1px solid #ddd;
    font-weight: bold;
  }

  thead th {
    position: sticky;
    top: 0;
    background-color: #dff0d8;
    color: #3c763d;
    font-weight: bold;
    text-align: center;
    border-bottom: 3px solid #ccc;
  }

  tbody tr:nth-child(even) {
    background-color: rgba(248, 249, 250, 0.7);
  }

  tbody tr:hover {
    background-color: #e9ecef;
    transition: background-color 0.3s ease;
  }

  tbody td {
    text-align: center;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }

  .table_body p {
    font-size: 1.2rem;
    text-align: center;
    margin-top: 2rem;
    color: #495057;
  }

  .date-section {
    margin-bottom: 2rem;
  }
`;

const SearchContainer = styled.div`
  margin: 1rem 0;

  input[type="date"] {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    width: 200px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }

    &:hover {
      border-color: #0056b3;
    }
  }
`;
