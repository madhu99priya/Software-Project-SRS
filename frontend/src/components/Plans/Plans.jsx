import React, { useEffect } from 'react';
import './Plans.css';
import { plansData } from '../../../data/plansData.jsx';
import whiteTick from '../../assets/whiteTick.png';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Plans = () => {
  // Initialize AOS for scroll animations
  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration
      offset: 150,     // Start animation 150px before scrolling into view
      easing: 'ease-in-out', // Smooth animation
    });
  }, []);

  return (
    <div className="plans-container">
      <div className="programs_header" style={{ gap: '2.4rem' }}>
        <span className='stroke-text'>LEVEL UP </span>
        <span> YOUR <br />JOURNEY</span>
        <span className='stroke-text'> WITH US </span>
      </div>

      <div className="plans">
        {plansData.map((plan) => (
          <div 
            className="plan" 
            key={plan.id} 
            data-aos="fade-up"  // Apply AOS fade-up animation
          >
            {plan.icon}
            <span>{plan.name}</span>
            <span>Rs. {plan.price}</span>

            <div className="features">
              {plan.features.map((feature, index) => (
                <div className="feature" key={index}>
                  <span style={{ fontSize: '10px' }}>
                    <img src={whiteTick} alt="" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to='/memberlogin' className='button'>Membership Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
