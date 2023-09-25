import React from 'react';
import Title from './Title';
import CategoryButtons from './CategoryButtons';
import AddItem from './AddItem'; // Import the AddItem component
import DeleteItemButton from './deleteItem';
import RetrieveItemDetails from './RetrieveItemDetails';

function App() {
  return (
    <div className="App">
      <Title />
      <CategoryButtons />
      <AddItem /> {/* Include the AddItem component */}
      <DeleteItemButton />
      <RetrieveItemDetails />
      {/* Add more components and functionality here */}
    </div>
  );
}

export default App;
