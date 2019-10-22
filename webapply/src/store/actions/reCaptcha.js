export const VERIFY_TOKEN = "RECAPTCHA/VERIFY_TOKEN";
export const SET_PENDING = "RECAPTCHA/SET_PENDING";
export const SET_TOKEN = "RECAPTCHA/SET_TOKEN";
export const SET_ERROR = "RECAPTCHA/SET_ERROR";
export const SET_VERIFIED = "RECAPTCHA/SET_VERIFIED";

export const setPending = payload => {
  return { type: SET_PENDING, payload };
};

export const setToken = payload => {
  return { type: SET_TOKEN, payload };
};

export const setError = payload => {
  return { type: SET_ERROR, payload };
};

export const setVerified = payload => {
  return { type: SET_VERIFIED, payload };
};

export const verifyToken = () => {
  return { type: VERIFY_TOKEN };
};
