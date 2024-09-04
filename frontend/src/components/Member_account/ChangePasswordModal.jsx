import React, { useState } from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";

const ChangePasswordModal = ({ isVisible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Verify Current Password, Step 2: Set New Password
  const [passwordForm] = Form.useForm();

  const handleVerifyCurrentPassword = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.post(
        `http://localhost:3000/api/users/userId/${userId}/verify-password`,
        values
      );

      if (response.data.match) {
        // If the current password is correct, move to the next step
        setStep(2);
      } else {
        message.error("Incorrect current password");
      }
    } catch (error) {
      console.error(
        "Password verification error:",
        error.response ? error.response.data : error.message
      );
      message.error("Failed to verify password");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (values) => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/userId/${userId}/change-password`,
        { newPassword: values.newPassword }
      );
      message.success(response.data.message);
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
          {step === 1 ? "Verify Current Password" : "Change Password"}
        </span>
      }
      visible={isVisible}
      onCancel={() => {
        onClose();
        setStep(1); // Reset to the first step when modal is closed
        passwordForm.resetFields();
      }}
      footer={null}
      bodyStyle={{ backgroundColor: "#001529" }} // Background color matches the settings card
      style={{ color: "white" }} // Text color matches the settings card
    >
      <Form
        form={passwordForm}
        onFinish={
          step === 1 ? handleVerifyCurrentPassword : handleChangePassword
        }
        style={{ backgroundColor: "white" }}
      >
        {step === 1 ? (
          <Form.Item
            name="currentPassword"
            rules={[
              { required: true, message: "Please enter current password" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter Current Password"
              style={{ backgroundColor: "white", color: "black" }}
            />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              name="newPassword"
              rules={[{ required: true, message: "Please enter new password" }]}
            >
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
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Your New Password"
                style={{ backgroundColor: "white", color: "black" }}
              />
            </Form.Item>
          </>
        )}

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              {step === 1 ? "Verify Password" : "Change Password"}
            </Button>
            <Button
              onClick={() => {
                onClose();
                setStep(1); // Reset to the first step
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
