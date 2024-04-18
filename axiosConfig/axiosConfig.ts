import axios from 'axios';

const axiosURL = axios.create({
  baseURL: 'https://corteworld.onrender.com'
});

export default axiosURL;
