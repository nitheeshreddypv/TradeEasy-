import React from 'react';

function SuccessModal({ itemKey, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <p>Item added successfully! Key: {itemKey}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SuccessModal;
