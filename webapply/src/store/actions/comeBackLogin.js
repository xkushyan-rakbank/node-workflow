export const GENERATE_OTP_CODE = "GENERATE_OTP_CODE";
export const VERIFY_OTP = "VERIFY_OTP";
export const SET_PENDING = "SET_PENDING";
export const GENERATE_CODE_SUCCESS = "GENERATE_CODE_SUCCESS";
export const VERIFY_CODE_SUCCESS = "VERIFY_CODE_SUCCESS";
export const VERIFY_CODE_FAILED = "VERIFY_CODE_FAILED";

export const generateOtpCode = payload => {
  return { type: GENERATE_OTP_CODE, payload };
};

export const verifyOtp = payload => {
  return { type: VERIFY_OTP, payload };
};

export const setOtpPendingRequest = payload => {
  return { type: SET_PENDING, payload };
};

export const generateCodeSuccess = payload => {
  return { type: GENERATE_CODE_SUCCESS, payload };
};

export const verifyCodeSuccess = () => {
  return { type: VERIFY_CODE_SUCCESS };
};

export const verifyCodeFailed = () => {
  return { type: VERIFY_CODE_FAILED };
};
