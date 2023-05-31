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
  SET_PASSPORT_ACTION_TYPE,
  VALIDATE_CONFIRM_ENTITY_SUCCESS,
  VALIDATE_CONFIRM_ENTITY_FAIL,
  NOTIFY_HOST,
  CREATE_FACE_LIVELINESS_FEEDBACK_ERROR,
  NOTIFY_HOST_SUCCESS,
  NOTIFY_HOST_ERROR,
  RESET_CONFIRM_ENTITY,
  LOAD_EID_DOCUMENTS,
  LOAD_PASSPORT_DOCUMENTS,
  LOAD_CONFIRM_ENTITY
} from "../actions/kyc";
import { handleActions } from "../../utils/redux-utils";
import { GET_KYC_STATUS_ERROR } from "../actions/kyc";
import { GET_KYC_STATUS_SUCCESS } from "../actions/kyc";

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
  },
  confirmEntity: false,
  confirmEntityError: null,
  notifyHostError: null,
  notifyHostSuccess: false,
  kycLoadedStatus: null
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
      confirmEntityError: null,
      faceScanSuccess: false,
      notifyHostSuccess: false,
      confirmEntity: false,
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
      confirmEntityError: null,
      faceScanSuccess: false,
      notifyHostSuccess: false,
      confirmEntity: false,
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
      identityValidation: null,
      confirmEntityError: null
    }),
    [CREATE_FACE_LIVELINESS_FEEDBACK]: (state, { payload }) => ({
      ...state,
      faceLivelinessFeedback: payload
    }),
    [CREATE_FACE_LIVELINESS_FEEDBACK_ERROR]: state => ({
      ...state,
      loading: false
    }),
    [SET_LIVELINESS_DATA]: (state, { payload }) => ({
      ...state,
      livelinessData: payload
    }),
    [VALIDATE_IDENTITY_SUCCESS]: (state, { payload }) => ({
      ...state,
      faceScanSuccess: true,
      faceLivelinessFeedback: null
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
    }),
    [VALIDATE_CONFIRM_ENTITY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      confirmEntity: payload
    }),
    [VALIDATE_CONFIRM_ENTITY_FAIL]: (state, { payload }) => ({
      ...state,
      loading: false,
      confirmEntityError: payload
    }),
    [RESET_CONFIRM_ENTITY]: state => ({
      ...state,
      loading: false,
      identityValidation: null,
      confirmEntityError: null,
      faceScanSuccess: false,
      notifyHostSuccess: false,
      confirmEntity: false
    }),
    [NOTIFY_HOST]: (state, { payload }) => ({
      ...state,
      loading: true
    }),
    [NOTIFY_HOST_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      notifyHostSuccess: payload
    }),
    [NOTIFY_HOST_ERROR]: (state, { payload }) => ({
      ...state,
      loading: false,
      notifyHostError: payload
    }),
    [LOAD_EID_DOCUMENTS]: (state, { payload }) => ({
      ...state,
      error: "",
      analysedEidDataStatus: "success",
      kycUploadedDocs: {
        ...state.kycUploadedDocs,
        eidFront: {
          name: "EID Front",
          link: `data:image/png;base64,${payload[1].documentContent}`
        },
        eidBack: { name: "EID Back", link: `data:image/png;base64,${payload[0].documentContent}` }
      },
      actionType: { ...state.actionType, eid: "Uploaded" },
      analysedEidData: payload
    }),
    [LOAD_PASSPORT_DOCUMENTS]: (state, { payload }) => ({
      ...state,
      error: "",
      analysedPassportDataStatus: "success",
      kycUploadedDocs: {
        ...state.kycUploadedDocs,
        passport: {
          name: "Passport",
          link: `data:image/png;base64,${payload}`
        }
      },
      actionType: { ...state.actionType, passport: "Uploaded" },
      analysedPassportData: payload
    }),
    [LOAD_CONFIRM_ENTITY]: (state, { payload }) => ({
      ...state,
      identityValidation: null,
      faceScanSuccess: true,
      confirmEntity: true,
      confirmEntityError: null
    }),
    [GET_KYC_STATUS_SUCCESS]: (state, { payload }) => ({
      ...state,
      kycLoadedStatus: payload
    }),
    [GET_KYC_STATUS_ERROR]: (state, { payload }) => ({
      ...state,
      kycLoadedStatus: payload
    })
  },
  initialState
);
