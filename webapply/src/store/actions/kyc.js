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
export const SET_LIVELINESS_DATA = "SET_LIVELINESS_DATA";
export const VALIDATE_IDENTITY_SUCCESS = "VALIDATE_IDENTITY_SUCCESS";
export const VALIDATE_IDENTITY_FAIL = "VALIDATE_IDENTITY_FAIL";

export const EID_PREVIEW_DATA = "EID_PREVIEW_DATA";
export const PASSPORT_PREVIEW_DATA = "PASSPORT_PREVIEW_DATA";
export const SET_EID_ACTION_TYPE = "SET_EID_ACTION_TYPE";
export const SET_PASSPORT_ACTION_TYPE = "SET_PASSPORT_ACTION_TYPE";

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

export const setLivelinessData = response => {
  return { type: SET_LIVELINESS_DATA, payload: response };
};

export const validateIdentitySuccess = () => {
  return { type: VALIDATE_IDENTITY_SUCCESS };
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
