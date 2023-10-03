import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import necessary components from 'react-router-dom'
import Title from './Title';
import CategoryButtons from './CategoryButtons';
import AddItem from './AddItem';
import DeleteItemButton from './deleteItem';
//import Addphoto from './addphoto';
//import Ret from './Rretrieve_item_Details';
import UploadPhoto from './UploadPhoto';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Title />} />
          <Route path="/categories" element={<CategoryButtons />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/upload-photo" element={<UploadPhoto />} />
        
          <Route path="/delete-item" element={<DeleteItemButton />} />
        

        </Routes>
        {/* Add more components and functionality here */}
      </div>
    </BrowserRouter>
  );
}

export default App;
