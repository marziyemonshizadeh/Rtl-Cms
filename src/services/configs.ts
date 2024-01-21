import axios from "axios";

//baseurl
const apiRequests = axios.create({
  baseURL: "https://deploy-cms-json-server.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Auth: "Bearer Token",
  },
});
// requests
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
