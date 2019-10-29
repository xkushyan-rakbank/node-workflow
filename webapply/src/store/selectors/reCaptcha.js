export const getReCaptcha = state => state.reCaptcha;

export const getReCaptchaToken = state => getReCaptcha(state).token;

export const getReCaptchaVerified = state => getReCaptcha(state).isVerified;

export const getReCaptchaPending = state => getReCaptcha(state).isPending;

export const getReCaptchaError = state => getReCaptcha(state).error;
