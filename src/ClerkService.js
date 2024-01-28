import axios from 'axios';

const isAuthenticated = async () => {
  const yourClerkAuthToken = 'pk_test_Y3Jpc3AtaGFkZG9jay0yNS5jbGVyay5hY2NvdW50cy5kZXYk';

  try {
    const response = await axios.get('https://clerk-api.com/auth/check', {
      headers: {
        'Authorization': `Bearer ${yourClerkAuthToken}`,
      },
    });

    return response.data.isAuthenticated;
  } catch (error) {
    console.error('Error checking authentication status:', error);
    return false;
  }
};

export default isAuthenticated;
