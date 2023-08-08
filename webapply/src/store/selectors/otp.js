export const getOtp = state => state.otp;

export const isOtpGenerated = state => getOtp(state).isGenerated;

export const isOtpVerified = state => getOtp(state).isVerified;

export const getIsGenerating = state => getOtp(state).isGenerating;

export const getIsRoInviteEfr = state => getOtp(state).isRoInviteEFR;
