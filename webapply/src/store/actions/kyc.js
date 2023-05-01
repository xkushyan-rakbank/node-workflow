export const CREATE_KYC_TRANSACTION = "CREATE_KYC_TRANSACTION";
export const CREATE_KYC_TRANSACTION_SUCCESS = "CREATE_KYC_TRANSACTION_SUCCESS";

export const ANALYSE_OCR = "ANALYSE_OCR";
export const ANALYSE_OCR_SUCCESS = "ANALYSE_OCR_SUCCESS";
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

export const analyseOcrSuccess = response => ({
  type: ANALYSE_OCR_SUCCESS,
  payload: response
});

export const analyseOcrFail = payload => {
  return { type: ANALYSE_OCR_FAIL, payload };
};
