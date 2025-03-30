import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Replace with your backend's base URL
    
});
// Add a request interceptor to include the token in the Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Add the token to the Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error); // Handle request errors
    }
);

export default axiosInstance;