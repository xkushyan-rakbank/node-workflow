import * as actions from "../actions/reCaptcha";

/**
 * @typedef {Object} ReCaptcha
 * @property {Boolean} isPending
 * @property {Boolean} isVerified
 * @property {String} token
 * @property {String} error
 */
const initialState = {
  isPending: false,
  isVerified: false,
  token: "",
  error: ""
};

const reCaptchaReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PENDING:
      return {
        ...state,
        isPending: action.payload
      };
    case actions.SET_VERIFIED:
      return {
        ...state,
        isPending: false,
        isVerified: action.payload
      };
    case actions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case actions.SET_ERROR:
      return {
        ...state,
        isPending: false,
        isVerified: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reCaptchaReducer;
