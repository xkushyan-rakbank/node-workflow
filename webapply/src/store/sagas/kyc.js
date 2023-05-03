import { all, call, put, select, takeLatest } from "redux-saga/effects";

import {
  KycTransactionSuccess,
  CREATE_KYC_TRANSACTION,
  ANALYSE_OCR,
  analyseOcrSuccessEid,
  analyseOcrSuccessPassport,
  analyseOcrFail
} from "../actions/kyc";
import { getAuthorizationHeader, getProspectId } from "../selectors/appConfig";
import { analyzeOcrData, createKYCTransaction } from "../../api/apiClient";
import { getKyc } from "../selectors/kyc";
import { log } from "../../utils/loggger";
import { DOC_TYPE_EID } from "../../constants";

export function* createKycTransactionSaga() {
  try {
    const headers = yield select(getAuthorizationHeader);
    const prospectId = yield select(getProspectId);
    const response = yield call(createKYCTransaction.send, prospectId, headers);
    yield put(KycTransactionSuccess(response.data));
  } catch (error) {
    log(error);
  }
}

export function* analyseOcrDataSaga({ payload }) {
  try {
    const { KycTransactionResponse } = yield select(getKyc);
    const headers = { headers: { Authorization: `Bearer ${KycTransactionResponse.kycUserToken}` } };

    const { ocrData, documentType } = payload;

    const response = yield call(
      analyzeOcrData.send,
      KycTransactionResponse.kycTransactionId,
      ocrData,
      headers,
      documentType
    );
    if (documentType === DOC_TYPE_EID) {
      yield put(analyseOcrSuccessEid(response));
    } else {
      yield put(analyseOcrSuccessPassport(response));
    }
  } catch (error) {
    log(error);
    yield put(analyseOcrFail(error));
  }
}

export default function* KycTransactionSaga() {
  yield all([
    takeLatest(CREATE_KYC_TRANSACTION, createKycTransactionSaga),
    takeLatest(ANALYSE_OCR, analyseOcrDataSaga)
  ]);
}
