import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import homeLogo from "../../assets/Logo.jpeg";
import "./Sidebar_Member.css";
import LogoutPopup from "./LogoutPopup.jsx";
import { useNavigate } from "react-router-dom";
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

const Sidebar_Member = ({
  setActiveComponent,
  selectedKey,
  setSelectedKey,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [hasUnreadSystemNotifications, setHasUnreadSystemNotifications] =
    useState(false); // State for system notifications

  const navigate = useNavigate();

  useEffect(() => {
    async function checkNotifications() {
      try {
        const storedUserId = localStorage.getItem("userId");

        // Fetch upcoming bookings
        const bookingResponse = await fetch(
          `http://localhost:3000/api/bookings/user/${storedUserId}/bookings`
        );
        if (!bookingResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const bookingData = await bookingResponse.json();
        const upcomingBookings = bookingData.filter((booking) => {
          const today = new Date();
          const bookingDate = new Date(booking.date);
          const differenceInTime = bookingDate - today;
          const daysRemaining = Math.ceil(
            differenceInTime / (1000 * 60 * 60 * 24)
          );
          return daysRemaining >= 0 && daysRemaining <= 4;
        });
        setHasUnreadNotifications(upcomingBookings.length > 0);

        // Fetch active announcements for notifications
        const announcementResponse = await fetch(
          `http://localhost:3000/api/announcements` // Updated to fetch announcements
        );
        if (!announcementResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const announcementData = await announcementResponse.json();

        // Assuming announcementData.announcements is the array of announcements
        const unreadSystemNotifications = announcementData.announcements.filter(
          (announcement) => new Date(announcement.endDate) >= new Date() // Example logic to check if the announcement is still active
        );
        setHasUnreadSystemNotifications(unreadSystemNotifications.length > 0);
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
    setHasUnreadSystemNotifications(false); // Mark system notifications as read
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
              hasUnreadNotifications || hasUnreadSystemNotifications ? (
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
        </Menu>
        <div className="logout-button-wrapper">
          <button onClick={handleLogout} className="logout-button">
            <span className="icon">
              <LogoutOutlined />
            </span>
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
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
