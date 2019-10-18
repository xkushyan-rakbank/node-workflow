import httpClient from "./axiosConfig";
import store from "./../store/configureStore";
export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

const { pathname } = window.location;
console.log(pathname);
let queryString = "";
let segment = "";

if (pathname.includes("/agent/")) {
  queryString = "?role=agent";
} else if (pathname.includes("/sme/")) {
  segment = "sme";
  queryString = `?segment=${segment}&role=customer`;
}

function buildURI(uriName, prospectId, documentKey) {
  let uri = store.getState().appConfig.endpoints[uriName];
  uri = uri.replace("{prospectId}", prospectId);
  uri = uri.replace("{documentKey}", documentKey);
  uri = uri.replace("{userType}", segment);
  return uri;
}

export default {
  config: {
    get: () => {
      return httpClient.request({
        method: "GET",
        url: `webapply/api/v1/config${queryString}`
      });
    },
    reload: () => {
      return httpClient.request({
        method: "GET",
        url: `webapply/api/v1/config${queryString}`
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
        url: buildURI("recaptchaUri"),
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

  uploadProspectDocuments: {
    uploadDocuments: (prospectId, data) => {
      return httpClient.request({
        url: buildURI("uploadDocumentUri", prospectId),
        method: "POST",
        data
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
