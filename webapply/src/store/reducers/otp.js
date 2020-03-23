import * as actions from "../actions/otp";
import { APPLICANT_INFO_FORM } from "../actions/applicantInfoForm";

export const initialState = {
  isGenerating: false,
  isGenerated: false,
  isPending: false,
  isVerified: false,
  verificationError: false,
  mode: "",
  otpTokenValidityInSec: "",
  otpTokenValidUntil: "",
  generatedAt: Date.now(),
  attempts: 0
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.VERIFY_OTP: {
      return {
        ...state,
        verificationError: false,
        isVerified: false,
        isPending: true
      };
    }
    case APPLICANT_INFO_FORM:
    case actions.GENERATE_OTP_CODE: {
      return {
        ...state,
        verificationError: false,
        isVerified: false,
        isGenerating: true,
        isGenerated: false,
        mode: "",
        otpTokenValidityInSec: "",
        otpTokenValidUntil: "",
        isPending: false,
        error: ""
      };
    }
    case actions.SET_PENDING: {
      return {
        ...state,
        isPending: action.payload
      };
    }
    case actions.SET_GENERATING: {
      return {
        ...state,
        isGenerating: action.payload
      };
    }
    case actions.GENERATE_CODE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        isGenerating: false,
        isGenerated: true,
        isPending: false,
        generatedAt: Date.now()
      };
    }
    case actions.VERIFY_CODE_SUCCESS: {
      return {
        ...state,
        isGenerating: false,
        isGenerated: false,
        isVerified: true,
        verificationError: false,
        isPending: false,
        attempts: 0
      };
    }
    case actions.VERIFY_CODE_FAILED: {
      return {
        ...state,
        isVerified: false,
        verificationError: true,
        isPending: false,
        attempts: state.attempts + 1
      };
    }
    case actions.VERIFY_CLEAR_ERROR: {
      return {
        ...state,
        verificationError: false
      };
    }
    default:
      return state;
  }
};

export default otpReducer;
