import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_PATH || "http://localhost:8080"
});

export default instance;
