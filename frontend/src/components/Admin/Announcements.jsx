import React, { useState, useEffect } from "react";
import { Button, List, Form, Input, Modal, Tabs } from "antd";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { DeleteOutlined } from "@ant-design/icons";
import "./Announcement.css";

const { TabPane } = Tabs;
const { confirm } = Modal;

const AddAnnouncement = () => {
  const [form] = Form.useForm(); // Hook for form management
  const [previousAnnouncements, setPreviousAnnouncements] = useState([]);
  const [editId, setEditId] = useState(null); // To hold the ID of the announcement being edited
  const [isModalVisible, setIsModalVisible] = useState(false); // Control the visibility of the modal

  // Fetch announcements on component mount
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/announcements"
      );
      setPreviousAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editId) {
        // Editing an announcement
        await axios.put(`http://localhost:3000/api/announcements/${editId}`, {
          message: values.message,
          endDate: values.endDate,
        });
        enqueueSnackbar("Announcement updated successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        setIsModalVisible(false); // Close the modal after update
      } else {
        // Creating a new announcement
        await axios.post("http://localhost:3000/api/announcements", {
          message: values.message,
          endDate: values.endDate,
        });
        enqueueSnackbar("Announcement added successfully!", {
          variant: "success",
          autoHideDuration: 2000,
        });
        form.resetFields(); // Clear inputs after adding
      }

      setEditId(null); // Reset edit ID
      fetchAnnouncements(); // Refresh the list
    } catch (error) {
      console.error("Error submitting announcement:", error);
    }
  };

  const handleEdit = (announcement) => {
    form.setFieldsValue({
      message: announcement.message,
      endDate: announcement.endDate.split("T")[0], // Only keep the date part
    });
    setEditId(announcement._id);
    setIsModalVisible(true); // Open the modal with current announcement data
  };

  // Confirmation for deleting an announcement
  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this announcement?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id); // Call the delete function if confirmed
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/announcements/${id}`);
      enqueueSnackbar("Announcement deleted successfully!", {
        variant: "success",
        autoHideDuration: 2000,
      });
      fetchAnnouncements(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false); // Close modal on cancel
    form.resetFields(); // Clear the form data when canceled
    setEditId(null);
  };

  return (
    <div className="announcement-container">
      <h2 className="announcement-title">Announcements</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Add Announcement" key="1">
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              label="Message"
              name="message"
              rules={[
                { required: true, message: "Please input your message!" },
              ]}
            >
              <Input.TextArea style={{ height: "10rem" }} required />
            </Form.Item>
            <Form.Item
              label="End Date"
              style={{ width: "10rem" }}
              name="endDate"
              rules={[
                { required: true, message: "Please select an end date!" },
              ]}
            >
              <Input type="date" required />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {editId ? "Update Announcement" : "Add Announcement"}
              </Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane tab="Previous Announcements" key="2">
          <List
            itemLayout="horizontal"
            dataSource={previousAnnouncements}
            renderItem={(announcement) => (
              <List.Item
                actions={[
                  <Button key="edit" onClick={() => handleEdit(announcement)}>
                    Edit
                  </Button>,
                  <Button
                    key="delete"
                    danger
                    onClick={() => showDeleteConfirm(announcement._id)}
                    icon={<DeleteOutlined />}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={announcement.message}
                  description={`Ends on: ${new Date(
                    announcement.endDate
                  ).toLocaleDateString()}`}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>

      {/* Modal for Editing Announcement */}
      <Modal
        title="Edit Announcement"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null} // We will use custom footer with form
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please input your message!" }]}
          >
            <Input.TextArea style={{ height: "10rem" }} required />
          </Form.Item>
          <Form.Item
            label="End Date"
            style={{ width: "10rem" }}
            name="endDate"
            rules={[{ required: true, message: "Please select an end date!" }]}
          >
            <Input type="date" required />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Announcement
            </Button>
            <Button style={{ marginLeft: "10px" }} onClick={handleModalCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddAnnouncement;
