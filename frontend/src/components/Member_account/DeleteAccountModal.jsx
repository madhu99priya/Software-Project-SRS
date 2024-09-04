import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@ant-design/icons";

const DeleteAccountModal = ({ isVisible, onClose }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleDeleteAccount = async () => {
    const userId = localStorage.getItem("userId");

    if (!isPasswordVisible) {
      setIsPasswordVisible(true);
      return;
    }

    try {
      setLoading(true);

      // Verify password
      const verifyResponse = await axios.post(
        `http://localhost:3000/api/users/userId/${userId}/verify-password`,
        { password }
      );

      if (verifyResponse.data.success) {
        // Password is correct, delete the account
        await axios.delete(`http://localhost:3000/api/users/userId/${userId}`);
        message.success("Account deleted successfully");

        // Clear local storage and navigate to home
        localStorage.clear();
        navigate("/"); // Use navigate instead of history.push

        onClose(); // Close the modal
      } else {
        message.error("Incorrect password");
      }
    } catch (error) {
      console.error("Delete error:", error.response || error.message);
      message.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Delete Account"
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      closable={!loading}
    >
      {!isPasswordVisible ? (
        <>
          <p>Are you sure you want to delete your account?</p>
          <Button
            type="primary"
            danger
            onClick={handleDeleteAccount}
            loading={loading}
          >
            Yes, Delete My Account
          </Button>
          <Button
            onClick={onClose}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Cancel
          </Button>
        </>
      ) : (
        <>
          <p>Please enter your password to confirm deletion:</p>
          <Input.Password
            placeholder="Enter your password"
            prefix={<LockOutlined />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button
            type="primary"
            danger
            onClick={handleDeleteAccount}
            loading={loading}
            style={{ marginTop: 16 }}
          >
            Confirm Deletion
          </Button>
          <Button
            onClick={() => setIsPasswordVisible(false)}
            disabled={loading}
            style={{ marginTop: 8, marginLeft: 8 }}
          >
            Cancel
          </Button>
        </>
      )}
    </Modal>
  );
};

export default DeleteAccountModal;
