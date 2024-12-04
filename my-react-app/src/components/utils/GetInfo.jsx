import axios from 'axios';

export const Getinfo = async () => {
  const url = `http://localhost:3000/api`;
  const token = localStorage.getItem('userCredentials') 
    ? JSON.parse(localStorage.getItem('userCredentials')).token 
    : null;

  try {
    const response = await axios.post(
      url,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      // Return the student info
      return {
        username: response.data[0].username,
        name: response.data[0].stu_name,
        pagebalance: response.data[0].page_num,
      };
    } else if (response.status === 404) {
      throw new Error('Student not found');
    }
  } catch (error) {
    console.error('Error fetching student info:', error);
    throw error;
  }
};
