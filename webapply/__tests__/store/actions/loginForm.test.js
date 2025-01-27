import { ERROR_ACTION, WAIT_FOR_ACTION } from "redux-wait-for-action";

import {
  LOGIN_INFO_FORM,
  LOGIN_INFO_FORM_ERROR,
  LOGIN_INFO_FORM_SUCCESS,
  LOGOUT,
  loginInfoFormPromisify,
  loginInfoFormSuccess,
  loginInfoFormError,
  logout
} from "../../../src/store/actions/loginForm";

describe("applicantInfoForm actions", () => {
  it("should create an action to login info form promisify", () => {
    const payload = {};
    const expectedAction = {
      type: LOGIN_INFO_FORM,
      [WAIT_FOR_ACTION]: LOGIN_INFO_FORM_SUCCESS,
      [ERROR_ACTION]: LOGIN_INFO_FORM_ERROR,
      payload
    };
    expect(loginInfoFormPromisify(payload)).toEqual(expectedAction);
  });

  it("should create an action to login info form success", () => {
    const payload = {};
    const expectedAction = {
      type: LOGIN_INFO_FORM_SUCCESS,
      payload
    };
    expect(loginInfoFormSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to login info form error", () => {
    const error = {};
    const expectedAction = {
      type: LOGIN_INFO_FORM_ERROR,
      error
    };
    expect(loginInfoFormError(error)).toEqual(expectedAction);
  });

  it("should create an action to logout", () => {
    const expectedAction = { type: LOGOUT };
    expect(logout()).toEqual(expectedAction);
  });
});
