import axios from "axios";

export const uploadFileRequest = data => {
  return axios.post("http://localhost:80/upload", data);
};
