import { generatePath } from "react-router";
import isEmpty from "lodash/isEmpty";
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
  let queryString = "";
  const { pathname } = window.location;
  const role = pathname.includes("/agent") ? "agent" : "customer";

  if (product && segment) {
    queryString = `?segment=${segment}&product=${product}&role=${role}`;
  } else {
    const product = !isEmpty(store.getState().appConfig.endpoints)
      ? store.getState().appConfig.prospect.applicationInfo.accountType
      : null;
    // const product = "RAKelite";
    if (product) {
      queryString = `?segment=${segment}&product=${product}&role=${role}`;
    } else {
      queryString = `?segment=${segment}&role=${role}`;
    }
  }
  return queryString;
};
