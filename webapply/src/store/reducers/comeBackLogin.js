import * as actions from "../actions/comeBackLogin";

/**
 * @typedef {Object} Otp
 * @property {Boolean} isPending
 *
 * @property {Boolean} isGenerated
 * @property {String} mode ("email"|"sms")
 * @property {Number} otpTokenValidityInSec
 * @property {String} otpTokenValidUntil
 * @property {Number} generatedAt - timestamp
 *
 * @property {Boolean} isVerified
 * @property {Boolean} verificationError
 */
const initialState = {
  isPending: false,
  isGenerated: false,
  isVerified: false,
  verificationError: false,
  mode: "",
  otpTokenValidityInSec: "",
  otpTokenValidUntil: "",
  generatedAt: Date.now()
};

const comeBackLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VERIFY_OTP: {
      return {
        ...state,
        verificationError: false,
        isVerified: false,
        isPending: true
      };
    }
    case actions.GENERATE_OTP_CODE: {
      return {
        ...state,
        verificationError: false,
        isVerified: false,
        isGenerated: false,
        mode: "",
        otpTokenValidityInSec: "",
        otpTokenValidUntil: "",
        isPending: true,
        error: ""
      };
    }
    case actions.SET_PENDING: {
      return {
        ...state,
        isPending: action.payload
      };
    }
    case actions.GENERATE_CODE_SUCCESS: {
      const { mode, otpTokenValidityInSec, otpTokenValidUntil } = action.payload;
      return {
        ...state,
        mode,
        otpTokenValidityInSec,
        otpTokenValidUntil,
        isGenerated: true,
        isPending: false,
        generatedAt: Date.now()
      };
    }
    case actions.VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        isVerified: true,
        verificationError: false,
        isPending: false
      };
    }
    case actions.VERIFY_CODE_FAILED: {
      return {
        ...state,
        isVerified: false,
        verificationError: true,
        isPending: false
      };
    }
    default:
      return state;
  }
};

export default comeBackLoginReducer;
