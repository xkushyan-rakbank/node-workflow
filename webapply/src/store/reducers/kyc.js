import {
  CREATE_KYC_TRANSACTION_SUCCESS,
  ANALYSE_OCR_SUCCESS_PASSPORT,
  ANALYSE_OCR_SUCCESS_EID,
  ANALYSE_OCR,
  ANALYSE_OCR_FAIL,
  REMOVE_EID_OCR_DATA,
  REMOVE_PASSPORT_OCR_DATA,
  CREATE_FACE_SCAN_KEY_SUCCESS,
  CREATE_FACE_LIVELINESS_FEEDBACK,
  CHECK_FACE_LIVELINESS,
  SET_LIVELINESS_DATA,
  VALIDATE_IDENTITY_SUCCESS,
  VALIDATE_IDENTITY_FAIL,
  EID_PREVIEW_DATA,
  PASSPORT_PREVIEW_DATA,
  SET_EID_ACTION_TYPE,
  SET_PASSPORT_ACTION_TYPE
} from "../actions/kyc";
import { handleActions } from "../../utils/redux-utils";

export const initialState = {
  loading: false,
  transactionId: null,
  KycTransactionResponse: {},
  analysedPassportData: {},
  analysedEidData: {},
  error: "",
  analysedEidDataStatus: "",
  analysedPassportDataStatus: "",
  livelinessData: {},
  identityValidation: null,
  faceScanSuccess: false,
  faceLivelinessFeedback: null,
  kycUploadedDocs: {
    eidFront: {},
    eidBack: {},
    passport: {}
  },
  actionType: {
    eid: "",
    passport: ""
  }
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
      error: "",
      analysedPassportDataStatus: "success",
      analysedPassportData: payload
    }),
    [ANALYSE_OCR_SUCCESS_EID]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: "",
      analysedEidDataStatus: "success",
      analysedEidData: payload
    }),
    [ANALYSE_OCR_FAIL]: (state, action) => ({
      ...state,
      loading: false,
      analysedEidDataStatus: "failed",
      analysedPassportDataStatus: "failed",
      error: action.payload
    }),
    [REMOVE_EID_OCR_DATA]: (state, action) => ({
      ...state,
      loading: false,
      analysedEidData: {},
      analysedEidDataStatus: "",
      error: "",
      identityValidation: null,
      faceScanSuccess: false,
      kycUploadedDocs: {
        eidFront: {},
        eidBack: {},
        passport: {}
      },
      actionType: {
        ...state.actionType,
        eid: {},
        passport: {}
      }
    }),
    [REMOVE_PASSPORT_OCR_DATA]: (state, action) => ({
      ...state,
      loading: false,
      analysedPassportData: {},
      analysedPassportDataStatus: "",
      error: "",
      identityValidation: null,
      faceScanSuccess: false,
      kycUploadedDocs: {
        ...state.kycUploadedDocs,
        passport: {}
      },
      actionType: {
        ...state.actionType,
        passport: {}
      }
    }),
    [CREATE_FACE_SCAN_KEY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      faceScanKey: payload
    }),
    [CHECK_FACE_LIVELINESS]: state => ({
      ...state,
      loading: true,
      identityValidation: null
    }),
    [CREATE_FACE_LIVELINESS_FEEDBACK]: (state, { payload }) => ({
      ...state,
      faceLivelinessFeedback: payload
    }),
    [SET_LIVELINESS_DATA]: (state, { payload }) => ({
      ...state,
      livelinessData: payload
    }),
    [VALIDATE_IDENTITY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      faceScanSuccess: true
    }),
    [VALIDATE_IDENTITY_FAIL]: (state, { payload }) => ({
      ...state,
      loading: false,
      identityValidation: payload,
      faceLivelinessFeedback: null
    }),
    [EID_PREVIEW_DATA]: (state, { payload }) => ({
      ...state,
      loading: false,
      kycUploadedDocs: {
        ...state.kycUploadedDocs,
        eidFront: payload.front,
        eidBack: payload.back
      }
    }),
    [PASSPORT_PREVIEW_DATA]: (state, { payload }) => ({
      ...state,
      loading: false,
      kycUploadedDocs: { ...state.kycUploadedDocs, passport: payload }
    }),
    [SET_EID_ACTION_TYPE]: (state, { payload }) => ({
      ...state,
      actionType: { ...state.actionType, eid: payload }
    }),
    [SET_PASSPORT_ACTION_TYPE]: (state, { payload }) => ({
      ...state,
      actionType: { ...state.actionType, passport: payload }
    })
  },
  initialState
);
