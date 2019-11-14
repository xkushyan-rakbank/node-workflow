import httpClient from "./axiosConfig";
import store from "./../store/configureStore";
import { endpoints } from "./../constants/config";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

function buildURI(uriName, prospectId, documentKey) {
  const { pathname } = window.location;
  let uri = endpoints[uriName];
  const segment = pathname.includes("/agent")
    ? store.getState().appConfig.searchInfo.segment
    : pathname.substring(1, pathname.lastIndexOf("/"));

  uri = uri.replace("{prospectId}", prospectId);
  uri = uri.replace("{documentKey}", documentKey);
  uri = uri.replace("{userType}", segment);

  return uri;
}

export default {
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
