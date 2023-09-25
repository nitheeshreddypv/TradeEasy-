import React, { useState } from 'react';
abc
import { retrieveItemDetails } from './api'; // Import the API function for retrieving item details

function RetrieveItemDetails() {
  const [itemKey, setItemKey] = useState('');
  const [itemDetails, setItemDetails] = useState(null);
  const [retrievalStatus, setRetrievalStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (itemKey) {
      try {
        const response = await retrieveItemDetails(itemKey); // Make an API call to retrieve item details

        if (response.ok) {
          setItemDetails(response.data);
          
          // Store retrieved item details in state
          setRetrievalStatus('success');
        } else {
          setRetrievalStatus('error');
          console.error('Error retrieving item details:', response.error);
        }
      } catch (error) {
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
      
      {retrievalStatus === 'error' && itemDetails && (
        <div className="error-message">
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

      {retrievalStatus === 'error' && (
        <p className="error-message">Error retrieving item details. Please try again.</p>
        
       
      )}
    </div>
  );
}

export default RetrieveItemDetails;
