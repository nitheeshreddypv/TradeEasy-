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


export const Reet = async (itemKey, method = 'GET', data = null) => {
  try {
    const requestOptions = {
      method: 'GET', // Specify the HTTP method, default to GET
      headers: {
        'Content-Type': 'application/json',
      },
       // Stringify the data if provided
    };

    const response = await fetch(`${apiUrl}/retrieveItem/${itemKey}`, requestOptions);

    if (response.ok) {
      const responseData = await response.json();
      return { ok: true, data: responseData };
    } else {
      const errorData = await response.json(); // Parse the error response if available
      const errorMessage = errorData.message || 'Error retrieving item details';
      console.error(errorMessage);
      return { ok: false, error: errorMessage };
    }
  } catch (error) {
    console.error('Error:', error);
    return { ok: false, error: 'Network error. Please try again later.' };
  }
};
