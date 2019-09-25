export const GENERATE_OTP_CODE = "OTP/GENERATE_OTP_CODE";
export const VERIFY_OTP = "OTP/VERIFY_OTP";
export const SET_PENDING = "OTP/SET_PENDING";
export const GENERATE_CODE_SUCCESS = "OTP/GENERATE_CODE_SUCCESS";
export const VERIFY_CODE_SUCCESS = "OTP/VERIFY_CODE_SUCCESS";
export const VERIFY_CODE_FAILED = "OTP/VERIFY_CODE_FAILED";

export const generateOtpCode = () => ({
  type: GENERATE_OTP_CODE
});

export const verifyOtp = payload => ({
  type: VERIFY_OTP,
  payload
});

export const setOtpPendingRequest = payload => ({
  type: SET_PENDING,
  payload
});

export const generateCodeSuccess = payload => ({
  type: GENERATE_CODE_SUCCESS,
  payload
});

export const verifyCodeSuccess = () => ({
  type: VERIFY_CODE_SUCCESS
});

export const verifyCodeFailed = () => ({
  type: VERIFY_CODE_FAILED
});
