export const SET_TOKEN = "RECAPTCHA/SET_TOKEN";
export const SET_ERROR = "RECAPTCHA/SET_ERROR";

export const setToken = payload => {
  return { type: SET_TOKEN, payload };
};
