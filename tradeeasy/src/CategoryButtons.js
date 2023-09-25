import React from 'react';

function CategoryButtons() {
  return (
    <div className="category-buttons">
      <button onClick={() => handleClick('Real Estate')}>Real Estate</button>
      <button onClick={() => handleClick('Electrical')}>Electrical</button>
      <button onClick={() => handleClick('Vehicles')}>Vehicles</button>
      <button onClick={() => handleClick('Software Appliances')}>Software Appliances</button>
    </div>
  );
}

function handleClick(category) {
  // You can add code here to handle the category selection and navigation.
}

export default CategoryButtons;
