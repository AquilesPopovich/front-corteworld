import axios from 'axios';

const axiosURL = axios.create({
  baseURL: 'https://corteworld.onrender.com',
  // baseURL: 'http://localhost:3000',
});

export default axiosURL;
