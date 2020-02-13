import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

export const LOGIN_INFO_FORM = "LOGIN_INFO_FORM";
export const LOGIN_INFO_FORM_SUCCESS = "LOGIN_INFO_FORM_SUCCESS";
export const LOGIN_INFO_FORM_ERROR = "LOGIN_INFO_FORM_ERROR";
export const LOGOUT = "LOGOUT";

export const loginInfoFormPromisify = payload => ({
  type: LOGIN_INFO_FORM,
  [WAIT_FOR_ACTION]: LOGIN_INFO_FORM_SUCCESS,
  [ERROR_ACTION]: LOGIN_INFO_FORM_ERROR,
  payload
});

export const loginInfoFormSuccess = payload => {
  return { type: LOGIN_INFO_FORM_SUCCESS, payload };
};

export const loginInfoFormError = error => {
  return { type: LOGIN_INFO_FORM_ERROR, error };
};

export const logout = () => {
  return { type: LOGOUT };
};
