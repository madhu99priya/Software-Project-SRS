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
  Tabs,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  EditOutlined,
  LockOutlined,
  DeleteOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import ChangePasswordModal from "./ChangePasswordModal"; // Import the new component

const { TabPane } = Tabs;

const Settings = ({ onUpgradePackage }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [editing, setEditing] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

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

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/userId/${userId}`,
        values
      );
      message.success("Profile updated successfully");

      setUserData(response.data);

      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        age: response.data.age,
        address: response.data.address,
        membershipType: response.data.membershipType,
      });

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

  const generalData = [
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
      icon: <EnvironmentOutlined />,
    },
    {
      key: "6",
      field: "Package Type",
      name: "membershipType",
      value: userData.membershipType,
      icon: <GiftOutlined />,
    },
  ];

  const renderColumns = (data) => [
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
              <Input
                prefix={record.icon}
                placeholder={`Enter your ${record.name.toLowerCase()}`}
              />
            </Form.Item>
          ) : (
            <>
              {record.value}
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

  return (
    <div className="settings-container">
      <Card
        className="settings-card"
        title={
          <>
            <span style={{ color: "white", fontSize: "2rem" }}>Settings</span>
            <Tooltip title={editing ? "Cancel Edit" : "Edit"}></Tooltip>
          </>
        }
      >
        <Tabs tabPosition="left" className="custom-tabs">
          <TabPane tab="General" key="1">
            <div className="general-content">
              <Form
                layout="vertical"
                form={form}
                initialValues={{
                  name: userData.name,
                  email: userData.email,
                  phone: userData.phone,
                  age: userData.age,
                  address: userData.address,
                  membershipType: userData.membershipType,
                }}
                onFinish={onFinish}
              >
                {dataLoading ? (
                  <Spin size="large" />
                ) : (
                  <Table
                    dataSource={generalData}
                    columns={renderColumns(generalData)}
                    pagination={false}
                    showHeader={false}
                    rowKey="key"
                  />
                )}
                {editing && (
                  <Form.Item
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      marginBottom: "-30px",
                    }}
                  >
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setEditing(false)}>Cancel</Button>
                    </Space>
                  </Form.Item>
                )}
              </Form>

              {!editing && (
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
              )}
            </div>
          </TabPane>
          <TabPane tab="Account" key="2">
            {dataLoading ? (
              <Spin size="large" />
            ) : (
              <div className="account-content">
                <div className="account-item">
                  <LockOutlined style={{ color: "white" }} />
                  <a
                    className="change_p"
                    onClick={() => setIsPasswordModalVisible(true)}
                  >
                    Change Password
                  </a>
                </div>
                <div className="account-item">
                  <DeleteOutlined style={{ color: "red" }} />
                  <a
                    className="delete_a"
                    onClick={() => setIsPasswordModalVisible(true)}
                  >
                    Delete Account
                  </a>
                </div>
              </div>
            )}
          </TabPane>
        </Tabs>
      </Card>

      <ChangePasswordModal
        isVisible={isPasswordModalVisible}
        onClose={() => setIsPasswordModalVisible(false)}
      />
    </div>
  );
};

export default Settings;
