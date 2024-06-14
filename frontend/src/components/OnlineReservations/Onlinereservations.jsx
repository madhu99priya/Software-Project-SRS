import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Onlinereservations.css';

const OnlineReservations = () => {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reservations?date=${date}`);
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };
    fetchReservations();
  }, [date]);

  const timeSlots = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
    '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', 
    '08:00 PM', '09:00 PM'
  ];

  const courts = ['Court 01', 'Court 02', 'Court 03', 'Court 04'];

  return (
    <div className="online-reservations">
      <h1>Online Reservations</h1>
      <div className="date-picker">
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />
      </div>
      <div className="courts">
        <div className="courts-header">
          {courts.map(court => (
            <div key={court} className="court-title">{court}</div>
          ))}
        </div>
        <div className="time-slots">
          {timeSlots.map(time => (
            <div key={time} className="time-slot">
              <div className="time-slot-title">{time}</div>
              {courts.map(court => {
                const reservation = reservations.find(res => 
                  res.timeSlot === time && res.facility === court
                );
                return (
                  <div key={court} className={`court-reservation ${reservation ? '' : 'empty'}`}>
                    {reservation ? reservation.user : 'Available'}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineReservations;
