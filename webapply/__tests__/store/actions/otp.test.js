import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";

import {
  GENERATE_OTP_CODE,
  VERIFY_OTP,
  SET_PENDING,
  SET_GENERATING,
  GENERATE_CODE_SUCCESS,
  VERIFY_CODE_FAILED,
  VERIFY_CODE_SUCCESS,
  VERIFY_CLEAR_ERROR,
  generateOtpCode,
  verifyOtp,
  setOtpPendingRequest,
  setGeneratingCode,
  generateCodeSuccess,
  verifyCodeSuccess,
  verifyCodeFailed,
  verifyClearError,
  generateOtpCodePromisify
} from "../../../src/store/actions/otp";

describe("applicantInfoForm actions", () => {
  it("should create an action to generate otp code", () => {
    const payload = {};
    const { email, countryCode, mobileNo } = payload;
    const expectedAction = {
      type: GENERATE_OTP_CODE,
      payload: {
        email,
        countryCode,
        mobileNo
      }
    };
    expect(generateOtpCode(payload)).toEqual(expectedAction);
  });

  it("should create an action to set otp verify otp", () => {
    const code = "xxx";
    const expectedAction = {
      type: VERIFY_OTP,
      payload: code
    };
    expect(verifyOtp(code)).toEqual(expectedAction);
  });

  it("should create an action to set generating code", () => {
    const payload = false;
    const expectedAction = {
      type: SET_PENDING,
      payload
    };
    expect(setOtpPendingRequest(payload)).toEqual(expectedAction);
  });

  it("should create an action to set generating code", () => {
    const payload = false;
    const expectedAction = {
      type: SET_GENERATING,
      payload
    };
    expect(setGeneratingCode(payload)).toEqual(expectedAction);
  });

  it("should create an action to generate code success", () => {
    const expectedAction = { type: GENERATE_CODE_SUCCESS };
    expect(generateCodeSuccess()).toEqual(expectedAction);
  });

  it("should create an action to verify code success", () => {
    const expectedAction = { type: VERIFY_CODE_SUCCESS };
    expect(verifyCodeSuccess()).toEqual(expectedAction);
  });

  it("should create an action to generate code failed", () => {
    const expectedAction = { type: VERIFY_CODE_FAILED };
    expect(verifyCodeFailed()).toEqual(expectedAction);
  });

  it("should create an action to generate code error", () => {
    const expectedAction = { type: VERIFY_CLEAR_ERROR };
    expect(verifyClearError()).toEqual(expectedAction);
  });

  it("should create an action to generateOtpCodePromisify", () => {
    const payload = {};
    const expectedAction = {
      type: GENERATE_OTP_CODE,
      [WAIT_FOR_ACTION]: GENERATE_CODE_SUCCESS,
      [ERROR_ACTION]: VERIFY_CODE_FAILED,
      payload
    };
    expect(generateOtpCodePromisify(payload)).toEqual(expectedAction);
  });
});
