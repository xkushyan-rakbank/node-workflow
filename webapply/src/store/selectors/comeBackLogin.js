/**
 * @param {Store} state
 * @return {Otp}
 */
export const getOtp = state => state.comeBackLogin;

export const isOtpGenerated = state => state.comeBackLogin.isGenerated;
