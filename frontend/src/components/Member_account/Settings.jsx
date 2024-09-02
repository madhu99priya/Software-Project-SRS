import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";
import {
  Card,
  Input,
  Button,
  message,
  Space,
  Spin,
  Form,
  Table,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  EditOutlined,
  LockOutlined,
} from "@ant-design/icons";

const Settings = ({ onUpgradePackage }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/userId/${userId}`
        );
        setUserData(response.data);
        form.setFieldsValue({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          age: response.data.age,
          address: response.data.address,
          membershipType: response.data.membershipType,
        });
        setDataLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        message.error("Failed to load user data");
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");
    console.log("Updating user with userId:", userId);
  
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/userId/${userId}`,
        values
      );
      message.success("Profile updated successfully");
      
      // Update local state with the response data
      setUserData(response.data); 
      
      // Update form fields
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        age: response.data.age,
        address: response.data.address,
        membershipType: response.data.membershipType,
      });
  
      // Update localStorage with the new user data
      localStorage.setItem("userName", response.data.name);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userPhone", response.data.phone);
      localStorage.setItem("userAge", response.data.age);
      localStorage.setItem("userAddress", response.data.address);
      localStorage.setItem("userMembershipType", response.data.membershipType);
  
      setEditing(false);
    } catch (error) {
      console.error(
        "Update error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  

  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (_, record) => (
        <>
          {editing && record.field !== "Membership Type" ? (
            <Form.Item
              name={record.name}
              style={{ margin: 0 }}
              rules={[
                {
                  required: record.name !== "password",
                  message: `Please enter your ${record.name.toLowerCase()}`,
                },
              ]}
            >
              {record.name === "password" ? (
                <Input.Password
                  prefix={record.icon}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                />
              ) : (
                <Input
                  prefix={record.icon}
                  placeholder={`Enter your ${record.name.toLowerCase()}`}
                />
              )}
            </Form.Item>
          ) : (
            <>
              {record.field === "Password" ? "••••••••" : record.value}
              {record.field === "Membership Type" && editing && (
                <>
                  <br />
                  <a onClick={() => onUpgradePackage()}>Upgrade Package</a>
                </>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      field: "Name",
      name: "name",
      value: userData.name,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      field: "Email",
      name: "email",
      value: userData.email,
      icon: <MailOutlined />,
    },
    {
      key: "3",
      field: "Phone",
      name: "phone",
      value: userData.phone,
      icon: <PhoneOutlined />,
    },
    {
      key: "4",
      field: "Age",
      name: "age",
      value: userData.age,
      icon: <IdcardOutlined />,
    },
    {
      key: "5",
      field: "Address",
      name: "address",
      value: userData.address,
      icon: <HomeOutlined />,
    },
    {
      key: "6",
      field: "Membership Type",
      name: "membershipType",
      value: userData.membershipType,
      icon: <IdcardOutlined />,
    },
    {
      key: "7",
      field: "Password",
      name: "password",
      value: "",
      icon: <LockOutlined />,
    },
  ];

  return (
    <div className="settings-container">
      <Card
        className="settings-card"
        title={
          <>
            <span style={{ color: "white", fontSize: "2rem" }}>Settings</span>
            <Tooltip title={editing ? "Cancel Edit" : "Edit"}>
              <Button
                type="link"
                icon={<EditOutlined style={{ fontSize: "24px" }} />}
                onClick={() => setEditing(!editing)}
                style={{
                  float: "right",
                  alignItems: "center",
                  marginTop: "10px",
                  backgroundColor: "white",
                }}
              />
            </Tooltip>
          </>
        }
        bordered={false}
      >
        {dataLoading ? (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Form form={form} onFinish={onFinish}>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                style={{ marginBottom: 20 }}
                rowKey="key" // Ensure each row has a unique key
              />
              {editing && (
                <Form.Item>
                  <Space>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                    >
                      Update
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={() => {
                        form.resetFields();
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              )}
            </Form>
          </>
        )}
      </Card>
    </div>
  );
};

export default Settings;
