import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";

export const CREATE_KYC_TRANSACTION = "CREATE_KYC_TRANSACTION";
export const CREATE_KYC_TRANSACTION_SUCCESS = "CREATE_KYC_TRANSACTION_SUCCESS";

export const ANALYSE_OCR = "ANALYSE_OCR";
export const ANALYSE_OCR_SUCCESS_PASSPORT = "ANALYSE_OCR_SUCCESS_PASSPORT";
export const ANALYSE_OCR_SUCCESS_EID = "ANALYSE_OCR_SUCCESS_EID";

export const REMOVE_PASSPORT_OCR_DATA = "REMOVE_PASSPORT_OCR_DATA";
export const REMOVE_EID_OCR_DATA = "REMOVE_EID_OCR_DATA";

export const ANALYSE_OCR_FAIL = "ANALYSE_OCR_FAIL";
export const CREATE_FACE_SCAN_KEY = "CREATE_FACE_SCAN_KEY";
export const CREATE_FACE_SCAN_KEY_SUCCESS = "CREATE_FACE_SCAN_KEY_SUCCESS";
export const CHECK_FACE_LIVELINESS = "CHECK_FACE_LIVELINESS";
export const CREATE_FACE_LIVELINESS_FEEDBACK = "CREATE_FACE_LIVELINESS_FEEDBACK";
export const CREATE_FACE_LIVELINESS_FEEDBACK_ERROR = "CREATE_FACE_LIVELINESS_FEEDBACK_ERROR";
export const SET_LIVELINESS_DATA = "SET_LIVELINESS_DATA";
export const VALIDATE_IDENTITY_SUCCESS = "VALIDATE_IDENTITY_SUCCESS";
export const VALIDATE_IDENTITY_FAIL = "VALIDATE_IDENTITY_FAIL";
export const VALIDATE_CONFIRM_ENTITY_SUCCESS = "VALIDATE_CONFIRM_ENTITY_SUCCESS";
export const VALIDATE_CONFIRM_ENTITY_FAIL = "VALIDATE_CONFIRM_ENTITY_FAIL";
export const RESET_CONFIRM_ENTITY = "RESET_CONFIRM_ENTITY";

export const NOTIFY_HOST = "NOTIFY_HOST";

export const EID_PREVIEW_DATA = "EID_PREVIEW_DATA";
export const PASSPORT_PREVIEW_DATA = "PASSPORT_PREVIEW_DATA";
export const SET_EID_ACTION_TYPE = "SET_EID_ACTION_TYPE";
export const SET_PASSPORT_ACTION_TYPE = "SET_PASSPORT_ACTION_TYPE";

export const NOTIFY_HOST_SUCCESS = "NOTIFY_HOST_SUCCESS";
export const NOTIFY_HOST_ERROR = "NOTIFY_HOST_ERROR";

export const LOAD_EID_DOCUMENTS = "LOAD_EID_DOCUMENTS";
export const LOAD_PASSPORT_DOCUMENTS = "LOAD_PASSPORT_DOCUMENTS";
export const LOAD_CONFIRM_ENTITY = "LOAD_CONFIRM_ENTITY";
export const GET_KYC_STATUS = "GET_KYC_STATUS";
export const GET_KYC_STATUS_SUCCESS = "GET_KYC_STATUS_SUCCESS";
export const GET_KYC_STATUS_ERROR = "GET_KYC_STATUS_ERROR";
export const ANALYSE_OCR_AGE_RESTRICTION = "ANALYSE_OCR_AGE_RESTRICTION";

export const SET_LOADING = "SET_LOADING";

export const setLoading = payload => ({
  type: SET_LOADING,
  payload
});

export const createKycTransaction = () => ({
  type: CREATE_KYC_TRANSACTION
});

export const KycTransactionSuccess = response => ({
  type: CREATE_KYC_TRANSACTION_SUCCESS,
  payload: response
});

export const analyseOcr = payload => ({
  type: ANALYSE_OCR,
  payload
});

export const analyseOcrSuccessPassport = response => ({
  type: ANALYSE_OCR_SUCCESS_PASSPORT,
  payload: response
});

export const analyseOcrSuccessEid = response => ({
  type: ANALYSE_OCR_SUCCESS_EID,
  payload: response
});

export const removePassportOcrData = () => ({
  type: REMOVE_PASSPORT_OCR_DATA
});

export const removeEidOcrData = () => ({
  type: REMOVE_EID_OCR_DATA
});

export const analyseOcrFail = payload => {
  return { type: ANALYSE_OCR_FAIL, payload };
};

export const analyseOcrAgeRestriction = payload => {
  return { type: ANALYSE_OCR_AGE_RESTRICTION, payload };
};

export const createFaceScanKey = () => ({
  type: CREATE_FACE_SCAN_KEY
});

export const createFaceScanKeySuccess = response => {
  return { type: CREATE_FACE_SCAN_KEY_SUCCESS, payload: response };
};

export const checkFaceLiveliness = response => {
  return { type: CHECK_FACE_LIVELINESS, payload: response };
};

export const saveFaceLivelinessFeedback = response => {
  return { type: CREATE_FACE_LIVELINESS_FEEDBACK, payload: response };
};

export const saveFaceLivelinessFeedbackError = () => {
  return { type: CREATE_FACE_LIVELINESS_FEEDBACK_ERROR };
};

export const setLivelinessData = response => {
  return { type: SET_LIVELINESS_DATA, payload: response };
};

export const validateIdentitySuccess = response => {
  return { type: VALIDATE_IDENTITY_SUCCESS, payload: response };
};

export const validateIdentityFail = response => {
  return { type: VALIDATE_IDENTITY_FAIL, payload: response };
};

export const setEidPreviewData = response => {
  return { type: EID_PREVIEW_DATA, payload: response };
};

export const setPassportPreviewData = response => {
  return { type: PASSPORT_PREVIEW_DATA, payload: response };
};

export const setEidActionType = response => {
  return { type: SET_EID_ACTION_TYPE, payload: response };
};

export const setPassportActionType = response => {
  return { type: SET_PASSPORT_ACTION_TYPE, payload: response };
};

export const validateEntityConfirmSuccess = response => {
  return { type: VALIDATE_CONFIRM_ENTITY_SUCCESS, payload: response };
};

export const validateEntityConfirmFail = response => {
  return { type: VALIDATE_CONFIRM_ENTITY_FAIL, payload: response };
};

export const resetConfirmEntity = () => {
  return { type: RESET_CONFIRM_ENTITY };
};

export const notifyHostPromisify = () => ({
  type: NOTIFY_HOST,
  [WAIT_FOR_ACTION]: NOTIFY_HOST_SUCCESS,
  [ERROR_ACTION]: NOTIFY_HOST_ERROR
});

export const notifyHost = () => {
  return { type: NOTIFY_HOST };
};

export const notifyHostSuccess = response => {
  return { type: NOTIFY_HOST_SUCCESS, payload: response };
};

export const notifyHostError = response => {
  return { type: NOTIFY_HOST_ERROR, payload: response };
};

export const loadEidDocuments = payload => {
  return { type: LOAD_EID_DOCUMENTS, payload };
};

export const loadPassportDocuments = payload => {
  return { type: LOAD_PASSPORT_DOCUMENTS, payload };
};

export const loadConfirmEntity = payload => {
  return { type: LOAD_CONFIRM_ENTITY, payload };
};

export const getKycStatus = () => {
  return { type: GET_KYC_STATUS };
};

export const getKycStatusPromisify = () => ({
  type: GET_KYC_STATUS,
  [WAIT_FOR_ACTION]: GET_KYC_STATUS_SUCCESS,
  [ERROR_ACTION]: GET_KYC_STATUS_ERROR
});

export const getKycSuccess = response => {
  return { type: GET_KYC_STATUS_SUCCESS, payload: response };
};

export const getKycError = response => {
  return { type: GET_KYC_STATUS_ERROR, payload: response };
};
