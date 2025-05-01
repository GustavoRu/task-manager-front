import axios from "axios";

const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Accept' : 'application/json',
    'X-Requested-With' : 'XMLHttpRequest',
  },
  withCredentials: false,
});

// Interceptor para agregar el token a todas las peticiones
clientAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default clientAxios;
