import {
  CREATE_KYC_TRANSACTION_SUCCESS,
  ANALYSE_OCR_SUCCESS_PASSPORT,
  ANALYSE_OCR_SUCCESS_EID,
  ANALYSE_OCR,
  ANALYSE_OCR_FAIL,
  REMOVE_EID_OCR_DATA,
  REMOVE_PASSPORT_OCR_DATA
} from "../actions/kyc";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  loading: false,
  KycTransactionResponse: {},
  analysedPassportData: {},
  analysedEidData: {},
  error: ""
};

export default handleActions(
  {
    [CREATE_KYC_TRANSACTION_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      KycTransactionResponse: payload
    }),
    [ANALYSE_OCR]: state => ({
      ...state,
      loading: true
    }),
    [ANALYSE_OCR_SUCCESS_PASSPORT]: (state, { payload }) => ({
      ...state,
      loading: false,
      analysedPassportData: payload
    }),
    [ANALYSE_OCR_SUCCESS_EID]: (state, { payload }) => ({
      ...state,
      loading: false,
      analysedEidData: payload
    }),
    [ANALYSE_OCR_FAIL]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload || "error"
    }),
    [REMOVE_EID_OCR_DATA]: (state, action) => ({
      ...state,
      loading: false,
      analysedEidData: {}
    }),
    [REMOVE_PASSPORT_OCR_DATA]: (state, action) => ({
      ...state,
      loading: false,
      analysedPassportData: {}
    })
  },
  initialState
);
