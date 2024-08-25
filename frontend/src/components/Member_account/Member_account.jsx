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
import Sidebar_Member from "./Sidebar_Member";
import Dashboard from "./Dashboard";
// import NewBookings from './components/NewBookings';
// import PreviousBookings from './components/PreviousBookings';
// import Packages from './components/Packages';
// import Notifications from './components/Notifications';
// import Settings from './components/Settings';
// import Logout from './components/Logout';

const Member_account = () => {
  // State to keep track of the active component
  const [activeComponent, setActiveComponent] = useState("dashboard");

  // Function to render the active component
  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      // case 'new_bookings':
      //   return <NewBookings />;
      // case 'prev_bookings':
      //   return <PreviousBookings />;
      // case 'packages':
      //   return <Packages />;
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
    <div style={{ display: "flex" }}>
      {/* Sidebar on the left */}
      <Sidebar_Member setActiveComponent={setActiveComponent} />

      {/* Main content on the right */}
      <div style={{ flex: 1, padding: "20px", background: "#f0f2f5" }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default Member_account;
