import React from 'react';
import './ContactUs.css';
import ContactImage from '../../assets/ContactImage.jpg';

const ContactUs = () => {
    return (
        <div className="contact">
            <div className="leftSide">
                <img src={ContactImage} alt="Contact" className="image_left" />
            </div>
            <div className="rightSide">
                <h1>Contact Us</h1>
                <form id="contact_form" method="POST">
                    <label htmlFor="name">Name</label>
                    <input name="name" placeholder="Enter your name..." type="text" />
                    <label htmlFor="email">Email</label>
                    <input name="email" placeholder="Enter email..." type="email" />
                    <label htmlFor="message">Message</label>
                    <textarea rows="6" placeholder="Enter message..." name="message" required></textarea>
                    <button type="submit">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
