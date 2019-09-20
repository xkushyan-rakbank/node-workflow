import httpClient from "./axiosConfig";
import config from "../config/config";

export const OTP_ACTION_GENERATE = "generate";
export const OTP_ACTION_VERIFY = "verify";

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
  /**
   * @typedef ApiOtpPayload
   * @property {String} prospectId
   * @property {String} countryCode
   * @property {String} mobileNo
   * @property {("generate"|"verify")} [action]
   * @property {String} [otpToken]
   */
  otp: {
    /**
     * @param {String} prospectId
     * @param {String} countryCode
     * @param {String} mobileNo
     */
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
    /**
     * @param {String} prospectId
     * @param {String} countryCode
     * @param {String} mobileNo
     * @param {String} otpToken
     */
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
  }
};
