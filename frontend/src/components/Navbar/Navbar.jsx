// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import Logo from '../../assets/Logo2.png'

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);

//   const handleScroll = () => {
//     const offset = window.scrollY;
//     if (offset > 200) {
//       setScrolled(true);
//     } else {
//       setScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
//       <div className="navbar-container">
//         <Link to="/" className="logo"><img src={Logo} alt="" className='logo' /></Link>
//         <div className="nav-menu">
//           <Link to="/" className="nav-item">Home</Link>
//           <Link to="/services" className="nav-item">Services</Link>
//           <Link to="/packages" className="nav-item">Packages</Link>
//           <Link to="/online-reservations" className="nav-item">Online Reservations</Link>
//           <Link to="/contact" className="nav-item">Contact Us</Link>
//           <Link  to= '/memberlogin' className='nav-item'>Members Area</Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import './Navbar.css';
import Logo from '../../assets/Logo2.png';
import { MdAdminPanelSettings } from "react-icons/md";

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
        <a href="/" className="logo" onClick={() => scroll.scrollToTop()}>
          <img src={Logo} alt="Logo" className='logo' />
        </a>
        <div className="nav-menu">
          <ScrollLink to="home" smooth={true} duration={500} className="nav-item">Home</ScrollLink>
          <ScrollLink to="services" smooth={true} duration={500} className="nav-item">Services</ScrollLink>
          <ScrollLink to="packages" smooth={true} duration={500} className="nav-item">Packages</ScrollLink>
          <ScrollLink to="online-reservations" smooth={true} duration={500} className="nav-item">Online Reservations</ScrollLink>
          <ScrollLink to="contact-container" smooth={true} duration={500} className="nav-item">Contact Us</ScrollLink>
          <a href='/memberlogin' className='nav-item'>Member's Area</a>
          <a href="/adminpanel" className='admin'><MdAdminPanelSettings size={33} color='black'/> </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

