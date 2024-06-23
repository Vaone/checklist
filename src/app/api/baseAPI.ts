import axios from 'axios'

export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  headers: { 'API-KEY': 'fdb39893-9bf4-4371-acd5-191995c67008' }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);