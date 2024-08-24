// MemberDashboard.js
import React from "react";
import { Layout } from "antd";
import Sidebar from "./Sidebar_Member";

const { Header, Content } = Layout;

const Member_account = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <h1>Hello world!</h1>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* Your main content goes here */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Member_account;
