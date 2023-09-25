import React, { useState } from 'react';
import { addItem } from './api'; // Import the addItem function

function AddItem() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    photo: '',
    cost: '',
    location: '',
    name: '',
    mobile: '',
    email: '',
    note: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [itemKey, setItemKey] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addItem(formData);

      if (response.ok) {
        const responseData = response.data;
        
        // Item added successfully
        setSubmissionStatus('success');
        setItemKey(responseData.itemKey);
        
        // Clear form fields by resetting formData to its initial state
        setFormData({
          category: '',
          photo: '',
          cost: '',
          location: '',
          name: '',
          mobile: '',
          email: '',
          note: '',
        });

        setShowForm(false); // Hide the form after successful submission
      } else {
        // Handle server error message
        setSubmissionStatus('error');
        console.error('Error adding item:', response.error);
      }
    } catch (error) {
      // Handle network error
      setSubmissionStatus('error');
      console.error('Network error. Please try again later.', error);
    }
  };

  return (
    <div className="add-item-button">
      <button onClick={() => setShowForm(true)}>Add Item</button>
      {showForm && (
        <div>
          <h2>Add Item</h2>
          {submissionStatus === 'success' && (
            <p className="success-message">
              Item added successfully! Key: {itemKey}
            </p>
          )}
          {submissionStatus === 'error' && (
            <p className="error-message">
              check your mail for a unique key and store it for future reference.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {/* Input fields */}
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Photo URL:</label>
              <input
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Cost:</label>
              <input
                type="text"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Note:</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddItem;
