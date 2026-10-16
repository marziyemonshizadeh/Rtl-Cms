import axios from "axios";

const apiRequests = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Auth: "Bearer Token",
  },
});
apiRequests.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => {
    console.log("Err", err);
    return Promise.reject(err);
  }
);
export default apiRequests;
