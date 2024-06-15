import React from 'react';
import './Footer.css';
import logo from '../../assets/Logo2.png';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <hr class="footer-divider" />
      <div className="footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            <img src={logo} alt="Logo" />
          </div>
          <p>
            Take the first step towards a healthier, stronger you with our
            unbeatable pricing plans. Let's sweat, achieve, and conquer together!
          </p>
          <div className="footer-socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">Business</a>
          <a href="#">Franchise</a>
          <a href="#">Partnerships</a>
        </div>

        <div className="footer-col">
          <h4>About Us</h4>
          <a href="#">Blogs</a>
          <a href="#">Careers</a>
          <a href="#">Security</a>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          {/* <p>Glorious Fitness Center, Wattegama</p>
          <p>Phone: 081-7601677</p> */}
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

        <div className="footer-col">
          <h4>Location</h4>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1193265317793!2d80.0548894!3d6.248002999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae181006c5ee20f%3A0x505c9be063b4f143!2sSRS%20Sports%20complex!5e0!3m2!1sen!2slk!4v1718421142060!5m2!1sen!2slk"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="footer-bar">
        Copyright &copy; 2024 SRS Academy. All rights reserved.
      </div>
    </>
  );
}

export default Footer;
