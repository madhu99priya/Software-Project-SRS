import React, { useState } from "react";
import { Layout, Menu } from "antd";
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


const { Sider } = Layout;

const Sidebar_Member = ({ setActiveComponent }) => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    localStorage.clear();// In order to clear the local storage
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
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
            {/* <Link to="/packages">Packages</Link> */}
            Packages
          </Menu.Item>

          <Menu.Item key="notifications" icon={<NotificationOutlined />}>
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

           
          <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-button">
            <span className="icon"><LogoutOutlined /></span>
            <span>Log Out</span>
          </button>
          </div>

          
        </Menu>
        {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
      </div>
    </Sider>
  );
};

export default Sidebar_Member;
