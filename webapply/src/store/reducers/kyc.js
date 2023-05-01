import {
  CREATE_KYC_TRANSACTION_SUCCESS,
  ANALYSE_OCR_SUCCESS,
  ANALYSE_OCR,
  ANALYSE_OCR_FAIL
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
    [ANALYSE_OCR_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      analysedPassportData: payload
    }),
    [ANALYSE_OCR_FAIL]: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload || "error"
    })
  },
  initialState
);
