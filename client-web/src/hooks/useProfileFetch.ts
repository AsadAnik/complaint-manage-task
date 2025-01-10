import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UseUserProfileResponse {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const useProfileFetch = (): UseUserProfileResponse => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken') ?? null;

    if (token) {
        (async () => {
            try {
                const response = await axios.get<{ user: UserProfile }>('http://localhost:3001/api/user/me', {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                setUser(response.data.user);

              } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch profile');

              } finally {
                setLoading(false);
              }
        })();
    } else {
        setError('No token provided');
        setLoading(false);
    }

  }, []);

  return { user, loading, error };
};

export default useProfileFetch;
