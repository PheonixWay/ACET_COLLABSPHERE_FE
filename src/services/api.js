import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust this to your backend URL
});

export default api;
