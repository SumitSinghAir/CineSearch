// utils/axiosInstance.js
import axios from 'axios';

export const axiosMainServerInstance = axios.create({
  // baseURL: 'https://8df1-2409-40e1-2b-2b6d-6418-77c4-1f84-96c.ngrok-free.app',
  // baseURL: 'http://10.145.77.148:4000',
  
  // baseURL: 'http://10.145.126.63:4000',
     baseURL: 'http://localhost:4000',
  // Any other configurations here
  headers: {
    Authorization: 'Bearer NEXTJS_' + process.env.NEXTAUTH_SECRET,
  } 
});