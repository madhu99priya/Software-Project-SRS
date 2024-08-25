import React, { useEffect, useState } from "react";
import { Card } from "antd";
import axios from "axios";
import "./Dashboard.css"; // You can style the card using a CSS file

const Dashboard = () => {
  const [userName, setUserName] = useState("");
  const [membershipType, setMembershipType] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");

    if (storedUserName) {
      setUserName(storedUserName);
    }

    if (storedUserId) {
      axios
        .get(`http://localhost:3000/api/users/userId/${storedUserId}`)
        .then((response) => {
          console.log(response.data); // Check what is being returned
          setMembershipType(response.data.membershipType);
        })
        .catch((error) => {
          console.error("There was an error fetching the user data!", error);
        });
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Card className="welcome-card">
        <h2>Welcome, {userName}!</h2>
        <p>We are glad to see you back.</p>
      </Card>
      <Card className="package-card">
        <h2>Your Package</h2>
        <p>{membershipType}!</p>
      </Card>
    </div>
  );
};

export default Dashboard;
