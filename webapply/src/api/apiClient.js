import httpClient from "./axiosConfig";
import config from "../config/config";

export default {
  config: {
    /**
     * @return {Promise<{data: AppConfig}>}
     */
    get: () => {
      // return httpClient.request({
      //   method: "GET",
      //   url: "/webapply/api/state"
      // });
      return Promise.resolve({ data: config });
    }
  },
  reCaptcha: {
    /**
     * @param {String} recaptchaToken
     */
    verify: recaptchaToken => {
      return httpClient.request({
        url: "/recaptcha/verify",
        method: "POST",
        data: { recaptchaToken }
      });
    }
  },
  otp: {
    /**
     * @param {String} prospectId
     * @param {String} countryCode
     * @param {String} mobileNo
     * @param {String} email
     * @param {String} [action="generate"]
     */
    generate: ({
      prospectId,
      countryCode,
      mobileNo,
      email,
      action = "generate"
    }) => {
      return httpClient.request({
        url: "/api/customer-onboarding/v1/banks/RAK/otp",
        method: "POST",
        data: {
          prospectId,
          countryCode,
          mobileNo,
          email,
          action
        }
      });
    },
    verify: () => {}
  },
  prospect: {
    /**
     * @param {Prospect} data
     */
    create: data => {
      return httpClient.request({
        url: "/webapply/api/v1/banks/RAK/usertypes/sme/prospects/",
        method: "POST",
        data
      });
    },
    /**
     * @param {String} prospectId
     * @param {Prospect} data
     */
    update: (prospectId, data) => {
      return httpClient.request({
        url: `/webapply/api/v1/banks/RAK/usertypes/sme/prospects/${prospectId}`,
        method: "PUT",
        data
      });
    }
  },

  uploadDocuments: {
    uploadDocument: () => {
      return httpClient.request({
        url: `/webapply/api/v1/banks/RAK/prospects/001/documents`,
        method: "GET"
      });
    }
  }
};
