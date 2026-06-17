import axios from "axios";
 
const axiosInstance = axios.create({
  baseURL: "https://dev-api-nurture.vinova.sg/api/v1/admins",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
 
export default axiosInstance;