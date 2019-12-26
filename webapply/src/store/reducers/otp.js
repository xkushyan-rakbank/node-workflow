import * as actions from "../actions/otp";
import { APPLICANT_INFO_FORM } from "../actions/applicantInfoForm";

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
      return {
        ...state,
        ...action.payload,
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
