// // MemberDashboard.js
// import React from "react";
// import { Layout } from "antd";
// import Sidebar from "./Sidebar_Member";

// const { Header, Content } = Layout;

// const Member_account = () => {
//   return (

//     <Layout>
//       <Sidebar />
//       <Layout className="site-layout">
//         <Header className="site-layout-background" style={{ padding: 0 }}>
//           <h1>Hello world!</h1>
//         </Header>
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: "24px 16px",
//             padding: 24,
//             minHeight: 280,
//           }}
//         >
//           {/* Your main content goes here */}
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default Member_account;

import React, { useState } from "react";
import { Layout } from "antd";
import Sidebar_Member from "./Sidebar_Member.jsx";
import Dashboard from "./Dashboard.jsx";
import NewBookings from "./NewBookings.jsx";
import Memberplans from '../../components/memberplans/Memberplans.jsx'
// import PreviousBookings from './components/PreviousBookings';
// import Packages from './components/Packages';
// import Notifications from './components/Notifications';
// import Settings from './components/Settings';
// import Logout from './components/Logout';

const { Content } = Layout;

const Member_account = () => {
  // State to keep track of the active component
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "new_bookings":
        return <NewBookings />;
      // case 'prev_bookings':
      //   return <PreviousBookings />;
      case 'packages':
        return <Memberplans />;
      // case 'notifications':
      //   return <Notifications />;
      // case 'settings':
      //   return <Settings />;
      // case 'logout':
      //   return <Logout />;
      default:
        return <Dashboard />;
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
