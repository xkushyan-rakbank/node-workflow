import client from "./axiosConfig";

export const getAppConfig = () => {
  return client.get("/webapply/api/state");
};
