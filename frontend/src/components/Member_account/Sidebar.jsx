import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa';
import { FiLogOut, FiMessageSquare } from 'react-icons/fi';
import { MdReviews, MdOutlineNoteAlt, MdManageAccounts } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from 'scrollreveal';
import Logo from '../../assets/Logo2.png'


const Sidebar = () => {
  const [currentLink, setCurrentLink] = useState(1);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  useEffect(() => {
    const sr = ScrollReveal({
      origin: 'left',
      distance: '80px',
      duration: 500,
      reset: false,
    });

    sr.reveal(
      `
      .brand,
      .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6),
      .logout
    `,
      {
        opacity: 0,
        interval: 300,
      }
    );
  }, []);

  return (
    <>
      <Section>
        <div className="top">
          <div className="brand">
            <img src= {Logo} alt="" className='logo' />
          </div>
          <div className="toggle"></div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? 'active' : 'none'}
                onClick={() => setCurrentLink(1)}
              >
                <a href="#">
                  <MdSpaceDashboard />
                  <span> Dashboard</span>
                </a>
              </li>
              <li
                className={currentLink === 2 ? 'active' : 'none'}
                onClick={() => setCurrentLink(2)}
              >
                <Link to="/admindashboard/members">
                  <MdManageAccounts />
                  <span> Members</span>
                </Link>
              </li>
              <li
                className={currentLink === 3 ? 'active' : 'none'}
                onClick={() => setCurrentLink(3)}
              >
                <Link to= "/admindashboard/payments" >
                  <FaAddressCard />
                  <span> Payments</span>
                </Link>
              </li>
              <li
                className={currentLink === 4 ? 'active' : 'none'}
                onClick={() => setCurrentLink(4)}
              >
                <Link to="/admindashboard/newregistrations">
                  <MdReviews />
                  <span> Registrations</span>
                </Link>
              </li>
              {/* <li
                className={currentLink === 5 ? 'active' : 'none'}
                onClick={() => setCurrentLink(5)}
              >
                <a href="#">
                  <FiMessageSquare />
                  <span> Messages</span>
                </a>
              </li> */}
              <li
                className={currentLink === 6 ? 'active' : 'none'}
                onClick={() => setCurrentLink(6)}
              >
                <Link to= "/admindashboard/notices">
                  <MdOutlineNoteAlt />
                  <span> Notices</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="logout-button">
            <FiLogOut/>
            <span>Log Out</span>
          </button>
        </div>
      </Section>
      {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
      {/* because of overlay the popup we have to place it after the section */}
    </>
  );
};

export default Sidebar;

const Section = styled.section`
  position: fixed;
  top: 0;   /* Ensure the sidebar starts from the top */
  left: 0;
  z-index: 1000;  /* Ensure it's above other elements */
  background-color: black;
  border-right: 2px solid #444; 
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5); 
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 2rem;
  
  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  
    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 2rem;
      span {
        font-size: 2rem;
        color: light-red;
        font-family: 'Permanent Marker', cursive;
      }
  
      .logo {
        width: 150px;
        height: 100px;
        margin-top : 1rem;
        margin-bottom : 0.5rem;
      }
    }
  
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: #ffecef;
            a {
              color: black;
            }
          }
          a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: #fface7;
          a {
            color: black;
          }
        }
      }
    }
  }
  
  .logout-button {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    gap: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.6rem 1rem;
    border-radius: 0.6rem;
  }
  
  .logout-button:hover {
    background-color: #da0037;
  }

  
  
  @media screen and (min-width: 280px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0 1rem;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

