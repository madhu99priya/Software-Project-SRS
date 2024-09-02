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
        form.setFieldsValue(response.data);
        setDataLoading(false);
      } catch (error) {
        message.error("Failed to load user data");
        setDataLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const onFinish = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    const { _id, ...updatedData } = values;

    try {
      await axios.put(`http://localhost:3000/api/users/${userId}`, updatedData);
      message.success("Profile updated successfully");
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
              name={record.field}
              style={{ margin: 0 }}
              rules={[
                {
                  required: true,
                  message: `Please enter your ${record.field.toLowerCase()}`,
                },
              ]}
            >
              <Input
                prefix={record.icon}
                placeholder={`Enter your ${record.field.toLowerCase()}`}
                defaultValue={record.value}
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

  const data = [
    {
      key: "1",
      field: "Name",
      value: userData.name,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      field: "Email",
      value: userData.email,
      icon: <MailOutlined />,
    },
    {
      key: "3",
      field: "Phone",
      value: userData.phone,
      icon: <PhoneOutlined />,
    },
    {
      key: "4",
      field: "Age",
      value: userData.age,
      icon: <IdcardOutlined />,
    },
    {
      key: "5",
      field: "Address",
      value: userData.address,
      icon: <HomeOutlined />,
    },
    {
      key: "6",
      field: "Membership Type",
      value: userData.membershipType,
      icon: <IdcardOutlined />,
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
                icon={<EditOutlined style={{ fontSize: "24px" }} />} // Adjust the size here
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
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
              style={{ marginBottom: 20 }}
            />
            {editing && (
              <Form form={form} onFinish={onFinish} layout="inline">
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" loading={loading}>
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
              </Form>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default Settings;
