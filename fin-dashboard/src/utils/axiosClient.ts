import axios, { AxiosInstance } from 'axios';

console.log('import.meta.env.API_URL,', import.meta.env)
const axiosClient: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

export default axiosClient;
