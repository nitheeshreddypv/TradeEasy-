import React from 'react';

function ItemDetails({ itemDetails }) {
  return (
    <div className="item-details">
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
  );
}

export default ItemDetails;
