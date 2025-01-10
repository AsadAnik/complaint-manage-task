import { useEffect } from 'react';
import axios from 'axios';

const useAuthInitializer = () => {
  useEffect(() => {
    const initializeAuth = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post('http://localhost:3001/api/user/renew-token', { refreshToken }, {
            headers: {
              'Content-Type': 'application/json'
            }
          });

          const newAccessToken = data.accessToken;

          // Save access token & refresh token
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          localStorage.setItem('accessToken', newAccessToken);

        } catch (error) {
          console.error('Failed to renew token:', error);
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('accessToken');
          window.location.href = '/';
        }
      }
    };

    initializeAuth();
  }, []);
};

export default useAuthInitializer;
