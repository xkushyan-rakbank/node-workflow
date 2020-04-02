import { generatePath } from "react-router";
import get from "lodash/get";
import { store } from "./../store";
import { endpoints } from "./../constants/config";

export const buildURI = (uriName, prospectId, documentKey) => {
  const { pathname } = window.location;
  let uri = endpoints[uriName];
  const userType = pathname.includes("/agent")
    ? get(store.getState(), "appConfig.searchInfo.segment", "")
    : "sme";

  return generatePath(uri, { userType, prospectId, documentKey });
};

export const getQueryString = (product, segment) => {
  const { pathname } = window.location;
  const role = pathname.includes("/agent") ? "agent" : "customer";

  if (product && segment) {
    return `?segment=${segment}&product=${product}&role=${role}`;
  }

  return `?segment=${segment}&role=${role}`;
};
