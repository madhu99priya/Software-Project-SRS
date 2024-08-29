import React from 'react';
import styled from 'styled-components';

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <PopupWrapper>
      <p>Are you sure! you want to log out?</p>
      <div>
        <button onClick={onConfirm} className="log-button">
          Yes, Log Out
        </button>
        <button onClick={onCancel} className="cancle-button">
          Cancel
        </button>
      </div>
    </PopupWrapper>
  );
};

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.85);
  padding: 2rem;
  border-radius: 8px;
  width: 350px;
  max-width: 80%;
  text-align: center;
  z-index: 13;

  .log-button{

  background-color: #f56565; 
  color: #ffffff; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem;  
  padding-bottom: 0.5rem; 
  margin-right: 0.5rem; 
  border-radius: 0.25rem; 
  transition: background-color 0.3s; 
  }

  .log-button:hover{
  background-color: #e53e3e;
  
  }

  .cancle-button{
  background-color: #e2e8f0; 
  color: #2d3748; 
  padding-left: 1rem; 
  padding-right: 1rem; 
  padding-top: 0.5rem;  
  padding-bottom: 0.5rem; 
  border-radius: 0.25rem; 
  transition: background-color 0.3s; 
  }


.cancle-button:hover {
  background-color: #cbd5e0; 
}
`;

export default LogoutPopup;
