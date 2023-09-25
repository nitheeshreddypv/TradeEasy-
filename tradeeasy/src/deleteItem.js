import React, { useState } from 'react';
import { deleteItem } from './api'; // Import the deleteItem function

function DeleteItemButton() {
  const [itemKey, setItemKey] = useState(''); // State to store the item key
  const [deletionStatus, setDeletionStatus] = useState(null); // State to track deletion status

  async function handleDeleteItem(e) {
    e.preventDefault(); // Prevent the form from submitting and reloading the page

    if (itemKey) {
      try {
        // Call the deleteItem function from api.js with the item key
        const response = await deleteItem(itemKey);

        if (response.ok) {
          // Item deleted successfully
          setDeletionStatus('success');
        } else {
          // Handle server error message
          setDeletionStatus('error');
          console.error('Error deleting item:', response.error);
        }
      } catch (error) {
        // Handle network error
        setDeletionStatus('error');
        console.error('Network error. Please try again later.', error);
      }
    } else {
      // Handle the case where itemKey is empty or not provided
      console.error('Item Key is required');
    }
  }

  return (
    <form onSubmit={handleDeleteItem} className="delete-item-button">
      <input
        type="text"
        placeholder="Item Key"
        value={itemKey}
        onChange={(e) => setItemKey(e.target.value)}
      />
      <button type="submit">Delete Item</button>
      {deletionStatus === 'success' && (
        <p className="success-message">Item deleted successfully!</p>
      )}
      {deletionStatus === 'error' && (
        <p className="error-message">Successfully deleted.</p>
      )}
    </form>
  );
}

export default DeleteItemButton;
