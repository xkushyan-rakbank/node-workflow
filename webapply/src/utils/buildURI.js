import { generatePath } from "react-router";
import store from "./../store/configureStore";
import { endpoints } from "./../constants/config";

export const buildURI = (uriName, prospectId, documentKey) => {
  const { pathname } = window.location;
  let uri = endpoints[uriName];
  const userType = pathname.includes("/agent")
    ? store.getState().appConfig.searchInfo.segment
    : pathname.substring(1, pathname.lastIndexOf("/"));

  return generatePath(uri, { userType, prospectId, documentKey });
};
