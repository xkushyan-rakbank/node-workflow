/**
 * @param {Store} state
 * @return {Otp}
 */
export const getOtp = state => state.otp;

export const getIsOtpGenerated = state => state.otp.isGenerated;

export const getIsOtpVerified = state => state.otp.isVerified;
