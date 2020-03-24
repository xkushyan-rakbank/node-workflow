import {
  VERIFY_OTP,
  GENERATE_OTP_CODE,
  SET_PENDING,
  SET_GENERATING,
  GENERATE_CODE_SUCCESS,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAILED,
  VERIFY_CLEAR_ERROR
} from "../actions/otp";
import { APPLICANT_INFO_FORM } from "../actions/applicantInfoForm";
import { handleActions, composeActions } from "../../utils/redux-utils";

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

export default handleActions(
  {
    [VERIFY_OTP]: state => ({
      ...state,
      verificationError: false,
      isVerified: false,
      isPending: true
    }),
    [composeActions(GENERATE_OTP_CODE, APPLICANT_INFO_FORM)]: state => ({
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
    }),
    [SET_PENDING]: (state, action) => ({
      ...state,
      isPending: action.payload
    }),
    [SET_GENERATING]: (state, action) => ({
      ...state,
      isGenerating: action.payload
    }),
    [GENERATE_CODE_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
      isGenerating: false,
      isGenerated: true,
      isPending: false,
      generatedAt: Date.now()
    }),
    [VERIFY_CODE_SUCCESS]: state => ({
      ...state,
      isGenerating: false,
      isGenerated: false,
      isVerified: true,
      verificationError: false,
      isPending: false,
      attempts: 0
    }),
    [VERIFY_CODE_FAILED]: state => ({
      ...state,
      isVerified: false,
      verificationError: true,
      isPending: false,
      attempts: state.attempts + 1
    }),
    [VERIFY_CLEAR_ERROR]: state => ({
      ...state,
      verificationError: false
    })
  },
  initialState
);
