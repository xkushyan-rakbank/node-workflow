import httpClient from "./axiosConfig";
import config from "../config/config";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

export default {
  config: {
    get: () => {
      // return httpClient.request({
      //   method: "GET",
      //   url: "/webapply/api/state"
      // });
      return Promise.resolve({ data: config });
    }
  },

  authentication: {
    login: data => {
      return httpClient.request({
        url: "/webapply/api/v1/banks/RAK/users/authenticate",
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
        url: "/webapply/api/v1/banks/RAK/otp",
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
        url: "/webapply/api/v1/banks/RAK/otp",
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
        url: `/webapply/api/v1/banks/RAK/usertypes/sme/prospects/${prospectId}`,
        method: "PUT",
        data
      });
    }
  },

  fetchDocument: {
    retriveDocuments: () => {
      return httpClient.request({
        url: "/webapply/api/v1/banks/RAK/prospects/001/documents",
        method: "GET"
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
