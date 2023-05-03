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
import {
  DOC_TYPE_EID,
  DOC_TYPE_PASSPORT,
  EID_EXPIRY,
  ERROR_MESSAGES,
  DOC_MISMATCH,
  PASSPORT_EXPIRY
} from "../../constants";
import { getOcrFieldValueBySource } from "../../utils/ocr";
import { NotificationsManager } from "../../components/Notification";

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
  const { ocrData, documentType } = payload;
  try {
    const { KycTransactionResponse, analysedEidData } = yield select(getKyc);
    const headers = { headers: { Authorization: `Bearer ${KycTransactionResponse.kycUserToken}` } };

    const response = yield call(
      analyzeOcrData.send,
      KycTransactionResponse.kycTransactionId,
      ocrData,
      headers,
      documentType
    );
    const daysToExpiry = getOcrFieldValueBySource(response?.daysToExpiry, "mrz");
    const nationality = getOcrFieldValueBySource(response?.nationalityIso2, "mrz");
    const firstName = getOcrFieldValueBySource(response?.firstName, "mrz");

    if (documentType === DOC_TYPE_EID) {
      daysToExpiry <= 10
        ? put(analyseOcrFail(EID_EXPIRY))
        : yield put(analyseOcrSuccessEid(response));
    }
    if (documentType === DOC_TYPE_PASSPORT) {
      const nationalityAsInEid = getOcrFieldValueBySource(analysedEidData?.nationalityIso2, "mrz");
      const firstNameAsInEid = getOcrFieldValueBySource(analysedEidData?.firstName, "mrz");

      const firstWordOfEidName = firstNameAsInEid?.split(" ")[0];
      const firstWordOfPassportName = firstName?.split(" ")[0];

      if (nationalityAsInEid !== nationality || firstWordOfEidName !== firstWordOfPassportName) {
        yield put(analyseOcrFail(DOC_MISMATCH));
      } else if (daysToExpiry <= 10) {
        yield put(analyseOcrFail(PASSPORT_EXPIRY));
      } else {
        yield put(analyseOcrSuccessPassport(response));
      }
    }
  } catch (error) {
    const notificationOptions = {};

    const message =
      ERROR_MESSAGES[(error?.response?.data?.errorCode)] &&
      ERROR_MESSAGES[(error?.response?.data?.errorCode)];

    if (message) {
      yield put(analyseOcrFail(message));
    } else {
      NotificationsManager.add(notificationOptions);
      yield put(analyseOcrFail());
    }
  }
}

export default function* KycTransactionSaga() {
  yield all([
    takeLatest(CREATE_KYC_TRANSACTION, createKycTransactionSaga),
    takeLatest(ANALYSE_OCR, analyseOcrDataSaga)
  ]);
}
