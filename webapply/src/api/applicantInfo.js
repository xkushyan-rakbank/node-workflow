import axios from "axios";
import config from "../config/config";

const { host, createProspectPath } = config.appConfig.endpoints;

export function applicantInfoFormSubmit(data) {
  return axios.post(`${host}${createProspectPath}`, data);
}
