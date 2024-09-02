import axios from "axios";
import Cookies from "js-cookie";

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["x-auth-token"] = `${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
