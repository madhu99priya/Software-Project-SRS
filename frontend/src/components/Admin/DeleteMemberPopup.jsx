import React from 'react'
import styled from 'styled-components'

const DeleteMemberPopup = ({ onConfirm, onCancel }) => {
  return (
    <div>
      <PopupWrapper>
        <p>Are you Sure! You want to delete the member details?</p>
        <div>
            <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mr-2 rounded">
                 Yes, Delete
            </button>
            <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
                Cancel
            </button>
        </div>
        </PopupWrapper>
    </div>
  )
}

export default DeleteMemberPopup;

const PopupWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 8px;
  width: 300px;
  max-width: 80%;
  text-align: center;
`;

