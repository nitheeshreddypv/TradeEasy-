const apiUrl = 'http://localhost:4000/api'; // Replace with your server's URL

export const addItem = async (formData) => {
  try {
    const response = await fetch(`${apiUrl}/addItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Handle success
      console.log('Item added successfully');
    } else {
      // Handle error
      console.error('Error adding item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const deleteItem = async (item_key) => {
  try {
    const response = await fetch(`${apiUrl}/deleteItem`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ item_key }), // Pass the item_key to identify the item to delete
    });

    if (response.ok) {
      // Handle success
      console.log('Item deleted successfully');
    } else {
      // Handle error
      console.error('Error deleting item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const getItemsByCategory = async (category) => {
  try {
    const response = await fetch(`${apiUrl}/items/category/${category}`);

    if (response.ok) {
      const data = await response.json();
      // Handle the fetched data here (e.g., update state with category-specific items)
      return data;
    } else {
      // Handle error
      console.error(`Error fetching ${category} items`);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const uploadPhoto = async (key, file) => {
  try {
      console.log('sdfgh');
    const formData = new FormData();
    formData.append('key', key); // Include the key in the form data
    formData.append('photo', file);

    const response = await fetch(`${apiUrl}/uploadPhoto`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Handle success
      console.log('Photo uploaded successfully');
    } else {
      // Handle error
      console.error('Error uploading photo');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
export const getImages = async (itemKey) => {
  try {
    const response = await fetch(`${apiUrl}/getImages/${itemKey}`);

    if (response.ok) {
      const data = await response.json();
      // Handle the fetched data here (e.g., update state with item-specific images)
      return data;
    } else {
      // Handle error
      console.error(`Error fetching images for ${itemKey}`);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

