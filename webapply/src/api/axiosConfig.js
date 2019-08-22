import axios from "axios";
import axiosDefaults from "axios/lib/defaults";

const instance = axios.create({
  baseURL: "http://localhost:8080"
});

export default instance;
