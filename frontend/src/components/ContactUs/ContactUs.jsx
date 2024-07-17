// import React from "react";
// import './ContactUs.css'
// import ContactImage from '../../assets/ContactImage.jpg'

// const ContactUs = () =>{
//     return (
//         <div className="contact">
//             <div className="leftSide">
//                 <img src={ContactImage} alt="" className="image_left"/>
//             </div>
//             <div className="rightSide">
//                 <h1>Contact Us</h1>
//                 <form id="contact_form" method="POST">
//                     <label htmlFor="name">Name</label>
//                     <input name = "name" placeholder="Enter your name..." type="text"/>
//                     <label htmlFor="email">Email</label>
//                     <input name = "email" placeholder="Enter email..." type="email"/>
//                     <label htmlFor="message">Message</label>
//                     <textarea rows="6" placeholder="Enter message..." name="message" required></textarea>
//                     <button type="submit">Send Message</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default ContactUs;

import React from "react";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaPaperPlane,
} from "react-icons/fa";
import "./ContactUs.css";

const ContactUs = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const serviceID = "service_d9v0uon";
    const templateID = "template_0yovi2p";
    const userID = "DymmMFcfwGNF3NQCl";

    emailjs.send(serviceID, templateID, data, userID).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        alert("Message sent successfully!");
        reset();
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Failed to send message, please try again.");
      }
    );
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-details">
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div className="contact-info">
              <span className="contact-label">Address</span>
              <p>Kandegoda, Ambalangoda</p>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div className="contact-info">
              <span className="contact-label">Email</span>
              <p>srssportcomplex@gmail.com</p>
            </div>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <div className="contact-info">
              <span className="contact-label">Phone</span>
              <p>077 721 6390</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
          <label>Name:</label>
          <input {...register("name", { required: true })} />

          <label>Email:</label>
          <input {...register("email", { required: true })} type="email" />

          <label>Message:</label>
          <textarea
            className="msg"
            rows="6"
            {...register("message", { required: true })}
          ></textarea>

          <button type="submit">
            Send <FaPaperPlane className="send-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
