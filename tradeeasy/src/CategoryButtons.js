import React, { useState } from 'react';
import { getItemsByCategory } from './api'; // Import the getItemsByCategory function

function CategoryButtons() {
  const categories = ['Real Estate', 'Electrical', 'Vehicles', 'Software Appliances'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [records, setRecords] = useState([]);

  const handleClick = async (category) => {
    setSelectedCategory(category);
    try {
      const data = await getItemsByCategory(category);
      setRecords(data);
    } catch (error) {
      console.error('Error fetching items by category:', error);
    }
  };

  return (
    <div className="category-buttons">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={selectedCategory === category ? 'active' : ''}
        >
          {category}
        </button>
      ))}
      {selectedCategory && (
        <div className="records">
          <h2>{selectedCategory} Records:</h2>
          <table>
            <thead>
              <tr>
               
                <th>Category</th>
                <th>Photo</th>
                <th>Cost</th>
                <th>Location</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Note</th>
                <th>Item Key</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  {/* Display all the record details here */}
                  
                  <td>{record.category}</td>
                  <td>{record.photo}</td>
                  <td>{record.cost}</td>
                  <td>{record.location}</td>
                  <td>{record.name}</td>
                  <td>{record.mobile}</td>
                  <td>{record.email}</td>
                  <td>{record.note}</td>
                  <td>{record.item_key}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CategoryButtons;
