import client from "./axiosConfig";

export const getUiConfig = () => {
  return client.get("/webapply/api/state");
};
