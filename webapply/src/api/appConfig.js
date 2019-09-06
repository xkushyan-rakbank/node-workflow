// import client from "./axiosConfig";
import config from "../config/config";

export const getAppConfig = () => {
  // return client.get("/webapply/api/state");
  return { data: config };
};
