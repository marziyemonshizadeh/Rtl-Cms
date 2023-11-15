import axios from "axios";

//baseurl
const apiRequests = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
    Auth: "Bearer Token",
  },
});
// requests
apiRequests.interceptors.request.use(
  (config) => {
    // console.log("Config", config);
    return config;
  },
  (err) => {
    console.log("Err", err);
    return Promise.reject(err);
  }
);
export default apiRequests;
