import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
<<<<<<< HEAD
  baseURL: import.meta.env.VITE_API_BASE_URL,
=======
  baseURL:'http://127.0.0.1:8000/api/', // Pointing to /api prefix as per backend setup
>>>>>>> c22e57f15658acb56e240bc10a7e750daacbf34f
});

api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Add Response Interceptor to handle 401s globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized access - 401");
      // Optional: Trigger logout or redirect
      // window.location.href = '/login'; 
      // Note: Hard redirect is aggressive, better to handle in UI context
    }
    return Promise.reject(error);
  }
);

export default api;
