import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


axiosInstance.interceptors.request.use(config => {
    config.headers['Email'] = email;
    config.headers['Password'] = password;
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
