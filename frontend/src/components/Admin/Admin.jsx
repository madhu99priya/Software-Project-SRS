import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar_Admin from "./Sidebar_Admin.jsx";
import AdminDashboard from "./AdminDashboard.jsx";
import Members from "./Members.jsx";
import Announcements from "./Announcements.jsx";
import Messages from "./Messages.jsx";
// import Memberplans from "../../components/memberplans/Memberplans.jsx";
// import Previous_Bookings from "./Previous_Bookings/Previous_Bookings.jsx";

const { Content } = Layout;

const Admin = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedKey, setSelectedKey] = useState("dashboard");

  //   const handleUpgradePackage = () => {
  //     setActiveComponent("packages");
  //     setSelectedKey("packages");
  //   };

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <AdminDashboard />;
      case "members":
        return <Members />;
      case "announcements":
        return <Announcements />;
      case "messages":
        return <Messages />;
      //   case "notifications":
      //     return <Notifications />;
      //   case "settings":
      //     return <Settings onUpgradePackage={handleUpgradePackage} />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Layout style={{ height: "100vh", minWidth: "100vw" }}>
      <Sidebar_Admin
        setActiveComponent={setActiveComponent}
        selectedKey={selectedKey}
        setSelectedKey={setSelectedKey}
      />
      <Layout>
        <Content
          style={{
            padding: "20px",
            background: "#111",
            overflow: "auto",
          }}
        >
          {renderComponent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin;
