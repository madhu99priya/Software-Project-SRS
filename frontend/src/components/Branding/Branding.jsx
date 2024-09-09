import React from 'react';
import { Typewriter } from 'react-simple-typewriter';
import './Branding.css';
import Background from '../../assets/Background1.jpg';

const Branding = () => {
  return (
    <div className="branding-container">
      <div className="brand-text">
        <div>
          <span>Meet the best coaches</span>
        </div>

        <div>
          <span>
            <Typewriter
              words={['Elevate Your Game']}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={0}
              delaySpeed={1000}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Branding;
