import httpClient from "./axiosConfig";
import { store } from "./../store";
import isEmpty from "lodash/isEmpty";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

let queryString = "";

function buildURI(uriName, prospectId, documentKey) {
  const { pathname } = window.location;
  let uri = store.getState().appConfig.endpoints[uriName];
  const segment = pathname.includes("/agent")
    ? store.getState().appConfig.searchInfo.segment
    : pathname.substring(1, pathname.lastIndexOf("/"));

  uri = uri.replace("{prospectId}", prospectId);
  uri = uri.replace("{documentKey}", documentKey);
  uri = uri.replace("{userType}", segment);

  return uri;
}

function getQueryString(product, segment) {
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
}

export default {
  config: {
    load: (product, segment) => {
      const query = getQueryString(product, segment);
      return httpClient.request({
        method: "GET",
        url: `webapply/api/v1/config${query}`
      });
    }
  },

  authentication: {
    login: data => {
      return httpClient.request({
        url: buildURI("authenticateUserUri"),
        method: "post",
        data
      });
    }
  },

  otp: {
    generate: ({ prospectId, countryCode, mobileNo }) => {
      return httpClient.request({
        url: buildURI("otpUri"),
        method: "POST",
        data: {
          action: OTP_ACTION_GENERATE,
          prospectId,
          countryCode,
          mobileNo
        }
      });
    },

    verify: ({ prospectId, countryCode, mobileNo, otpToken }) => {
      return httpClient.request({
        url: buildURI("otpUri"),
        method: "POST",
        data: {
          action: OTP_ACTION_VERIFY,
          prospectId,
          countryCode,
          mobileNo,
          otpToken
        }
      });
    }
  },

  prospect: {
    create: data => {
      return httpClient.request({
        url: buildURI("createProspectUri"),
        method: "POST",
        data
      });
    },
    update: (prospectId, data) => {
      return httpClient.request({
        url: buildURI("updateProspectUri", prospectId),
        method: "PUT",
        data
      });
    },
    get: prospectId => {
      return httpClient.request({
        url: buildURI("getProspectUri", prospectId),
        method: "GET"
      });
    }
  },

  retrieveApplicantInfos: {
    applicant: data => {
      return httpClient.request({
        url: buildURI("searchProspectUri"),
        method: "post",
        data
      });
    }
  },

  getProspectDocuments: {
    retriveDocuments: prospectId => {
      return httpClient.request({
        url: buildURI("getProspectDocumentsUri", prospectId),
        method: "GET"
      });
    }
  },

  search: {
    searchApplication: data => {
      return httpClient.request({
        url: buildURI("searchProspectUri"),
        method: "POST",
        data
      });
    }
  }
};
