import React, { useState } from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";

const ChangePasswordModal = ({ isVisible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [passwordForm] = Form.useForm();

  const handlePasswordChange = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/userId/${userId}/change-password`,
        values
      );
      message.success("Password changed successfully");
      onClose(); // Close the modal
      passwordForm.resetFields();
    } catch (error) {
      console.error(
        "Password change error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <span style={{ color: "black", fontSize: "1.5rem" }}>
          Change Password
        </span>
      }
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{ backgroundColor: "#001529" }} // Background color matches the settings card
      style={{ color: "white" }} // Text color matches the settings card
    >
      <Form
        form={passwordForm}
        onFinish={handlePasswordChange}
        style={{ backgroundColor: "white" }}
      >
        <Form.Item
          name="currentPassword"
          rules={[{ required: true, message: "Please enter current password" }]}
        >
          Current Password:
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter Current Password"
            style={{ backgroundColor: "white", color: "black" }}
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: "Please enter new password" }]}
        >
          New Password:
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Enter New Password"
            style={{ backgroundColor: "white", color: "black" }}
          />
        </Form.Item>
        <Form.Item
          name="confirmNewPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please confirm new password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          Confirm New Password:
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Your New Password"
            style={{ backgroundColor: "white", color: "black" }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
            <Button
              onClick={() => {
                onClose();
                passwordForm.resetFields();
              }}
            >
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
