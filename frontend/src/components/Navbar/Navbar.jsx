import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Logo from '../../assets/Logo2.png'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="logo"><img src={Logo} alt="" className='logo' /></Link>
        <div className="nav-menu">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/services" className="nav-item">Services</Link>
          <Link to="/packages" className="nav-item">Packages</Link>
          <Link to="/online-reservations" className="nav-item">Online Reservations</Link>
          <Link to="/contact" className="nav-item">Contact Us</Link>
          <Link  to= '/memberlogin' className='nav-item'>Members Area</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
