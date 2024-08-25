import React, { useEffect, useState } from "react";
import { Card } from "antd";
import "./Dashboard.css"; // You can style the card using a CSS file

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <Card className="welcome-card">
        <h2>Welcome, {userName}!</h2>
        <p>We are glad to see you back.</p>
      </Card>
    </div>
  );
};

export default Dashboard;
