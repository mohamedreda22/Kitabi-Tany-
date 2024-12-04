//import the necessary dependencies
import axios from 'axios';
import Cookies from 'js-cookie';
export const getOrders = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/order/getOrders', {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        });
        return response.data; // Return the data from the response
    } catch (error) {
        console.error(error); // Log the error to console
        throw new Error(error.response?.data?.message || 'An error occurred'); // Improved error handling
    }
};

