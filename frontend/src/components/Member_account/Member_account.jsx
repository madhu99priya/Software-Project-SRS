import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar_Member from "./Sidebar_Member.jsx";
import Dashboard from "./Dashboard.jsx";
import NewBookings from "./NewBookings.jsx";
import Notifications from "./Notifications.jsx";
import Settings from "./Settings.jsx";
import Memberplans from "../../components/memberplans/Memberplans.jsx";
import Previous_Bookings from "./Previous_Bookings/Previous_Bookings.jsx";

const { Content } = Layout;

const Member_account = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [selectedKey, setSelectedKey] = useState("dashboard");

  const handleUpgradePackage = () => {
    setActiveComponent("packages");
    setSelectedKey("packages");
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "new_bookings":
        return <NewBookings />;
      case "prev_bookings":
        return <Previous_Bookings />;
      case "packages":
        return <Memberplans />;
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings onUpgradePackage={handleUpgradePackage} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout style={{ height: "100vh", minWidth: "100vw" }}>
      <Sidebar_Member
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

export default Member_account;
