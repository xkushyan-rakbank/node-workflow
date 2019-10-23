export const LOGIN_INFO_FORM = "LOGIN_INFO_FORM";
export const LOGIN_INFO_FORM_SUCCESS = "LOGIN_INFO_FORM_SUCCESS";
export const LOGIN_INFO_FORM_FAIL = "LOGIN_INFO_FORM_FAIL";

export const LOGOUT = "LOGOUT";

export const FORMAT_LOGIN = "FORMAT_LOGIN";

/**
 * @param {Boolean} payload
 * @return {{payload: Boolean, type: String}}
 */
export const loginInfoForm = payload => {
  return {
    type: LOGIN_INFO_FORM,
    payload
  };
};

export const loginInfoFormSuccess = payload => {
  return { type: LOGIN_INFO_FORM_SUCCESS, payload };
};

export const loginInfoFormFail = error => {
  return { type: LOGIN_INFO_FORM_FAIL, error };
};

export const logout = () => {
  return { type: LOGOUT };
};

export const formatLogin = () => {
  return { type: FORMAT_LOGIN };
};
