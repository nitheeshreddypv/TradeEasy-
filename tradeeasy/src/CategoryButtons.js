import React, { useState } from 'react';
import { getItemsByCategory, getImages } from './api'; // Import the required functions

function CategoryButtons() {
  const categories = ['Real Estate', 'Electrical', 'Vehicles', 'Software Appliances'];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [records, setRecords] = useState([]);
  const [itemKey, setItemKey] = useState('');
  const [images, setImages] = useState([]);

  const handleClick = async (category) => {
    setSelectedCategory(category);
    try {
      const data = await getItemsByCategory(category);
      setRecords(data);
      setImages([]); // Reset images when a new category is selected
    } catch (error) {
      console.error('Error fetching items by category:', error);
    }
  };

  const handleViewImages = async () => {
    try {
      const data = await getImages(itemKey);
      setImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
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
        <div className="images">
          <input
            type="text"
            placeholder="Enter Item Key"
            value={itemKey}
            onChange={(e) => setItemKey(e.target.value)}
          />
          <button onClick={handleViewImages}>Click Here for Images</button>
          {images.map((imageUrl, index) => (
            <img
              key={index}
              src={imageUrl}
              alt={`Item ${index + 1}`}
              style={{ width: '100px', marginRight: '10px' }}
            />
          ))}
        </div>
      )}
      {records.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Cost</th>
              <th>Location</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Note</th>
              <th>Item Key</th>
              {/* Add more table headers for other record properties */}
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td>{record.category}</td>
                <td>{record.cost}</td>
                <td>{record.location}</td>
                <td>{record.name}</td>
                <td>{record.mobile}</td>
                <td>{record.email}</td>
                <td>{record.note}</td>
                <td>{record.item_key}</td>
                {/* Add more table cells for other record properties */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoryButtons;
