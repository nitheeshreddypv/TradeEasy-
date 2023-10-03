import React, { useState } from 'react';
import { uploadPhoto } from './api'; // Import the uploadPhoto function

function UploadPhoto() {
  const [file, setFile] = useState(null);
  const [key, setKey] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleKeyChange = (e) => {
    const selectedKey = e.target.value;
    setKey(selectedKey);
  };

  const handleUpload = async () => {
    try {
      // Call the uploadPhoto function directly with key and file
      await uploadPhoto(key, file);

      console.log('Photo uploaded successfully');
      document.write('succesfully uploaded');
      // Handle success (if needed)
    } catch (error) {
      console.error('Error uploading photo:', error);
      // Handle error (if needed)
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input type="text" placeholder="Enter key" value={key} onChange={handleKeyChange} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPhoto;
