/**
 * @param {Store} state
 * @return {Otp}
 */
export const getOtp = state => state.otp;

export const isOtpGenerated = state => state.otp.isGenerated;
