import axios from 'axios';

// Create axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000',  // Your backend URL
    withCredentials: true, // Make sure credentials (cookies) are included
});

// Intercept each request to add CSRF token if available
api.interceptors.request.use((config) => {
    // Get CSRF token from cookies or wherever you're storing it
    const csrfToken = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));

    if (csrfToken) {
        // Get the actual value of the csrf token
        const token = csrfToken.split('=')[1];
        config.headers['X-CSRFTOKEN'] = token; // Add CSRF token to request headers
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Intercept responses and handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
