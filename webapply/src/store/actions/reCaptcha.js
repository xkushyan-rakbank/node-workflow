export const VERIFY_TOKEN = "RECAPTCHA/VERIFY_TOKEN";
export const SET_PENDING = "RECAPTCHA/SET_PENDING";
export const SET_TOKEN = "RECAPTCHA/SET_TOKEN";
export const SET_ERROR = "RECAPTCHA/SET_ERROR";
export const SET_VERIFIED = "RECAPTCHA/SET_VERIFIED";

/**
 * @param {Boolean} payload
 * @return {{payload: Boolean, type: String}}
 */
export const setPending = payload => {
  return { type: SET_PENDING, payload };
};

/**
 * @param {String} payload
 * @return {{payload: String, type: String}}
 */
export const setToken = payload => {
  return { type: SET_TOKEN, payload };
};

/**
 * @param {String} payload
 * @return {{payload: String, type: String}}
 */
export const setError = payload => {
  return { type: SET_ERROR, payload };
};

/**
 * @param {Boolean} payload
 * @return {{payload: Boolean, type: String}}
 */
export const setVerified = payload => {
  return { type: SET_VERIFIED, payload };
};

export const verifyToken = () => {
  return { type: VERIFY_TOKEN };
};
