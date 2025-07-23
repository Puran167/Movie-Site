// src/api.js (or wherever you configure Axios)
import axios from "axios";

const API = axios.create({
  baseURL: "https://movie-site-j4c7.onrender.com/api", // ✅ Use your deployed backend URL
  withCredentials: false, // optional
});

export default API;
