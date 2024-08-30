import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar_Member from "./Sidebar_Member.jsx";
import Dashboard from "./Dashboard.jsx";
import NewBookings from "./NewBookings.jsx";
import Memberplans from '../../components/memberplans/Memberplans.jsx'
import Previous_Bookings from "./Previous_Bookings/Previous_Bookings.jsx";


const { Content } = Layout;

const Member_account = () => {
  
  const [activeComponent, setActiveComponent] = useState("dashboard");

  
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "new_bookings":
        return <NewBookings />;
      case 'prev_bookings':
        return <Previous_Bookings />;
      case 'packages':
        return <Memberplans />;
      // case 'notifications':
      //   return <Notifications />;
      // case 'settings':
      //   return <Settings />;
      // case 'logout':
      //   return <Logout />;
      // default:
      //   return <Dashboard />;
    }
  };

  return (
    <Layout style={{ height: "100vh", minWidth: "100vw" }}>
      {/* Sidebar Component */}
      <Sidebar_Member setActiveComponent={setActiveComponent} />

      {/* Main Content Area */}
      <Layout>
        <Content
          style={{
            padding: "20px",
            background: "#111", // Black background
            overflow: "auto",
          }}
        >
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Member_account;
