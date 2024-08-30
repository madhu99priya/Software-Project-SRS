import React, { useState, useEffect } from "react";
import { Layout, Menu, Badge } from "antd";
import homeLogo from "../../assets/Logo.jpeg";
import "./Sidebar_Member.css";
import LogoutPopup from "./LogoutPopup.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  ProductOutlined,
  LogoutOutlined,
  BookOutlined,
  CarryOutOutlined,
  HomeOutlined,
  SettingOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import Lottie from "lottie-react";
import animationBell from "../../assets/Animation_Bell.json";

const { Sider } = Layout;

const Sidebar_Member = ({ setActiveComponent }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function checkNotifications() {
      try {
        const storedUserId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:3000/api/bookings/user/${storedUserId}/bookings`
        );
        const text = await response.text();

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = JSON.parse(text);
        const upcomingBookings = data.filter((booking) => {
          const today = new Date();
          const bookingDate = new Date(booking.date);
          const differenceInTime = bookingDate - today;
          const daysRemaining = Math.ceil(
            differenceInTime / (1000 * 60 * 60 * 24)
          );
          return daysRemaining >= 0 && daysRemaining <= 4;
        });
        setHasUnreadNotifications(upcomingBookings.length > 0);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    checkNotifications();
  }, []);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    localStorage.clear();
    navigate("/");
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const handleNotificationClick = () => {
    setHasUnreadNotifications(false); // Mark notifications as read
    setSelectedKey("notifications");
    setActiveComponent("notifications");
  };


  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      style={{ minHeight: "100vh" }}
    >
      <div className="logo-container">
        <img src={homeLogo} alt="Company Logo" className="logo-image" />
      </div>
      {!collapsed && (
        <div className="brand-name">
          <p>SRS</p>
          <p>BADMINTON</p>
        </div>
      )}
      <div className="menu-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            setSelectedKey(key);
            setActiveComponent(key);
          }}
          theme="dark"
        >
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>

          <Menu.Item key="new_bookings" icon={<BookOutlined />}>
            New Bookings
          </Menu.Item>

          <Menu.Item key="prev_bookings" icon={<CarryOutOutlined />}>
            Previous Bookings
          </Menu.Item>

          <Menu.Item key="packages" icon={<ProductOutlined />}>
            Packages
          </Menu.Item>

          <Menu.Item
            key="notifications"
            icon={
              hasUnreadNotifications ? (
                <Lottie
                  animationData={animationBell}
                  loop={true}
                  style={{ width: 30, height: 30, marginLeft: "-8px" }}
                />
              ) : (
                <NotificationOutlined />
              )
            }
            onClick={handleNotificationClick}
          >
            Notifications
          </Menu.Item>
        </Menu>
      </div>
      <div className="logout-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            setSelectedKey(key);
            setActiveComponent(key);
          }}
          theme="dark"
        >
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>

//           <Menu.Item
//             key="logout"
//             icon={<LogoutOutlined />}
//             onClick={handleLogout}
//             className="logout-button"
//           >
//             Logout
//           </Menu.Item>


           
          <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-button">
            <span className="icon"><LogoutOutlined /></span>
            <span>Log Out</span>
          </button>
          </div>

          

        </Menu>
        {showLogoutPopup && (
          <LogoutPopup
            onConfirm={handleConfirmLogout}
            onCancel={handleCancelLogout}
          />
        )}
      </div>
    </Sider>
  );
};

export default Sidebar_Member;
