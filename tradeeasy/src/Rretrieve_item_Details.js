import React, { useState } from 'react';
import { Reet } from './api';

function Ret() {
  const [itemKey, setItemKey] = useState('');
  const [itemDetails, setItemDetails] = useState(null);
  const [retrievalStatus, setRetrievalStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (itemKey) {
      try {
        const response = await Reet(itemKey);

        if (response.ok) {
          setItemDetails(response.data);
          setRetrievalStatus('success');
        } else {
          setItemDetails(null); // Clear item details if there was an error
          setRetrievalStatus('error');
          console.error('Error retrieving item details:', response.error);
        }
      } catch (error) {
        setItemDetails(null); // Clear item details on network error
        setRetrievalStatus('error');
        console.error('Network error. Please try again later.', error);
      }
    } else {
      console.error('Item Key is required');
    }
  };

  return (
    <div className="retrieve-item-details">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Key"
          value={itemKey}
          onChange={(e) => setItemKey(e.target.value)}
        />
        <button type="submit">Retrieve Item</button>
      </form>

      {(retrievalStatus === 'success' || retrievalStatus === 'error') && itemDetails && (
        <div className={retrievalStatus === 'success' ? 'success' : 'error'}>
          {/* Display item details if itemDetails is available */}
          <h2>Item Details</h2>
          <p>Category: {itemDetails.category}</p>
          <p>Photo: {itemDetails.photo}</p>
          <p>Cost: {itemDetails.cost}</p>
          <p>Location: {itemDetails.location}</p>
          <p>Name: {itemDetails.name}</p>
          <p>Mobile: {itemDetails.mobile}</p>
          <p>Email: {itemDetails.email}</p>
          <p>Note: {itemDetails.note}</p>
          {/* Add more details as needed */}
        </div>
      )}

      {retrievalStatus === 'error' && !itemDetails && (
        <p className="error-message">Error retrieving item details. Please try again.</p>
      )}
    </div>
  );
}

export default Ret;
