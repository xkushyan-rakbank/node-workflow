/**
 * @param {Store} state
 * @return {ReCaptcha}
 */
export const getReCaptcha = state => state.reCaptcha;
/**
 * @param {Store} state
 * @return {String}
 */
export const getReCaptchaToken = state => getReCaptcha(state).token;
/**
 * @param {Store} state
 * @return {Boolean}
 */
export const getReCaptchaVerified = state => getReCaptcha(state).isVerified;
/**
 * @param {Store} state
 * @return {Boolean}
 */
export const getReCaptchaPending = state => getReCaptcha(state).isPending;
