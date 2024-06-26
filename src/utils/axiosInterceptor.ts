
import axios from 'axios';

axios.defaults.baseURL = 'http://104.128.55.140:8000/api/v1/';

// Add a request interceptor to attach the token to all requests
const axiosAuthMiddleware = {
    initialize: () => {

        console.log('initialize');

        axios.interceptors.request.use(
            (config: any) => {
                const token = localStorage.getItem('accessToken'); // Retrieve the token from storage

                if (token) {
                    if (!config.headers) {
                        config.headers = {};
                    }
                    config.headers.Authorization = `Bearer ${token}`; // Attach the token as an Authorization header
                    // config.headers.Accept = "application/json"; // Attach the token as an Authorization header
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

export default axiosAuthMiddleware; 
