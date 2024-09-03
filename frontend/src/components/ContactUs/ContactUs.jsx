import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import "./ContactUs.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { message } from "antd";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const serviceID = "service_d9v0uon";
    const templateID = "template_0yovi2p";
    const userID = "DymmMFcfwGNF3NQCl";

    emailjs.send(serviceID, templateID, data, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        message.success({
          content: "Message sent successfully!",
          duration: 3,
          style: {
            marginTop: "20vh",
          },
        });

        reset();
      },
      (error) => {
        console.log("FAILED...", error);
        message.error({
          content: "Failed to send message, please try again.",
          duration: 3,
          style: {
            marginTop: "20vh",
          },
        });
      }
    );
  };

  return (
    <div className="contact-container">
      <div className="left-side">
        <h2>Need Help with Your Reservation?</h2>
        <p>Reach out to us, and we’ll ensure your game goes smoothly.</p>
        <div className="contact-info">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <p className="contact-label">Address</p>
              <p style={{ fontSize: "1rem" }}>Kandegoda, Ambalangoda</p>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <p className="contact-label">Email</p>
              <p style={{ fontSize: "1rem" }}>srssportcomplex@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <div>
              <p className="contact-label">Phone</p>
              <p style={{ fontSize: "1rem" }}>077 721 6390</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-side">
        <h2>
          Contact <span className="res_h">Us</span>
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          Name:
          <input
            {...register("name", { required: true })}
            placeholder="Enter your Full Name"
            type="text"
            style={{ height: "10px" }}
          />
          Email:
          <input
            {...register("email", { required: true })}
            placeholder="Enter your Email"
            type="email"
            style={{ height: "10px" }}
          />
          Message:
          <textarea
            {...register("message", { required: true })}
            placeholder="Enter your Message"
            rows="6"
            style={{ resize: "none" }}
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
