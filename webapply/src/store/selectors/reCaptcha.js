export const getReCaptcha = state => state.reCaptcha;

export const getReCaptchaToken = state => getReCaptcha(state).token;

export const getReCaptchaError = state => getReCaptcha(state).error;
