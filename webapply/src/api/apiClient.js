import httpClient from "./axiosConfig";

export default {
  reCaptcha: {
    verify: recaptchaToken => {
      return httpClient.request({
        url: "/recaptcha/verify",
        method: "POST",
        data: { recaptchaToken }
      });
    }
  }
};
