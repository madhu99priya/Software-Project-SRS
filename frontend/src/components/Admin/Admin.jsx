import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userRes = await axios.get('/api/adminpanel/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(userRes.data);

                const reservationRes = await axios.get('/api/adminpanel/reservations', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setReservations(reservationRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Admin Page</h1>
            <h2>Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>{user.name} ({user.email})</li>
                ))}
            </ul>

            <h2>Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation._id}>
                        {reservation.date} - {reservation.time} - {reservation.user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Admin;


