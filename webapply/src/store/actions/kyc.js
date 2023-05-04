export const CREATE_KYC_TRANSACTION = "CREATE_KYC_TRANSACTION";
export const CREATE_KYC_TRANSACTION_SUCCESS = "CREATE_KYC_TRANSACTION_SUCCESS";

export const ANALYSE_OCR = "ANALYSE_OCR";
export const ANALYSE_OCR_SUCCESS_PASSPORT = "ANALYSE_OCR_SUCCESS_PASSPORT";
export const ANALYSE_OCR_SUCCESS_EID = "ANALYSE_OCR_SUCCESS_EID";

export const REMOVE_PASSPORT_OCR_DATA = "REMOVE_PASSPORT_OCR_DATA";
export const REMOVE_EID_OCR_DATA = "REMOVE_EID_OCR_DATA";

export const ANALYSE_OCR_FAIL = "ANALYSE_OCR_FAIL";

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
