import axios from "axios";

// Make it true when you are developing
const areYouDeveloping = false;

const axiosInstance = axios.create({
  baseURL: `${areYouDeveloping ? "http://localhost:5000/api" : "/api"}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for JWT
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Full page redirect
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
