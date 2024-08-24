import React, { useState } from "react";
import { Layout, Menu } from "antd";
import homeLogo from "../../assets/Logo.jpeg";
import "./Sidebar_Member.css";
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

const Sidebar_Member = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(true); // Start with the sidebar collapsed

  // Expand sidebar when the mouse enters
  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  // Collapse sidebar when the mouse leaves
  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      onMouseEnter={handleMouseEnter} // Expand on hover
      onMouseLeave={handleMouseLeave} // Collapse on mouse leave
      style={{ minHeight: "100vh" }}
    >
      <div className="logo-container">
        <img src={homeLogo} alt="Company Logo" className="logo-image" />
      </div>
      {!collapsed && ( // Only show brand name when sidebar is not collapsed
        <div className="brand-name">
          <p>SRS</p>
          <p>BADMINTON</p>
        </div>
      )}
      <div className="menu-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
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
          <Menu.Item key="notifications" icon={<NotificationOutlined />}>
            Notifications
          </Menu.Item>
        </Menu>
      </div>
      <div className="logout-wrapper">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          theme="dark"
        >
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sidebar_Member;
