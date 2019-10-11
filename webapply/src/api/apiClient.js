import httpClient from "./axiosConfig";
import store from "./../store/configureStore";
export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

const { pathname } = window.location;
let queryString = "";

if (pathname.includes("/agent/")) {
  queryString = "?segment=sme&product=checking&role=agent";
} else if (pathname.includes("/sme/")) {
  queryString = "?segment=sme&product=checking&role=customer";
}

function buildURI(uriName, prospectId, documentKey) {
  let uri = store.getState().appConfig.endpoints[uriName];
  uri = uri.replace("{prospectId}", prospectId);
  uri = uri.replace("{documentKey}", documentKey);

  return uri;
}

export default {
  config: {
    get: () => {
      return httpClient.request({
        method: "GET",
        url: `/webapply/api/v1/config${queryString}`
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

  reCaptcha: {
    verify: recaptchaToken => {
      return httpClient.request({
        url: "/recaptcha/verify",
        method: "POST",
        data: { recaptchaToken }
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
        url: "/webapply/api/v1/banks/RAK/usertypes/sme/prospects/",
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
        url: `/webapply/api/v1/banks/RAK/usertypes/sme/prospects/${prospectId}`,
        method: "GET"
      });
    }
  },

  retrieveApplicantInfos: {
    applicant: data => {
      return httpClient.request({
        url: "/webapply/api/v1/banks/RAK/usertypes/sme/prospects/search",
        method: "post",
        data
      });
    }
  },

  getProspectDocuments: {
    retriveDocuments: () => {
      return httpClient.request({
        url: "/webapply/api/v1/banks/RAK/prospects/001/documents",
        method: "GET"
      });
    }
  },

  uploadProspectDocuments: {
    uploadDocuments: data => {
      return httpClient.request({
        url: "http://10.86.251.137:8080/docUploader/banks/RAK/prospects/700/documents",
        method: "POST",
        data
      });
    }
  },

  search: {
    searchApplication: (apiUrl, data) => {
      return httpClient.request({
        url: apiUrl,
        method: "POST",
        data
      });
    }
  }
};
