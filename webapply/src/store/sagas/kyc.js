import { all, call, put, select, takeLatest } from "redux-saga/effects";

import {
  KycTransactionSuccess,
  CREATE_KYC_TRANSACTION,
  ANALYSE_OCR,
  analyseOcrSuccessEid,
  analyseOcrSuccessPassport,
  analyseOcrFail,
  CREATE_FACE_SCAN_KEY,
  CHECK_FACE_LIVELINESS,
  saveFaceLivelinessFeedback,
  createFaceScanKeySuccess,
  SET_LIVELINESS_DATA,
  validateIdentitySuccess,
  validateIdentityFail
} from "../actions/kyc";
import { getAuthorizationHeader, getProspectId } from "../selectors/appConfig";
import { analyzeOcrData, createKYCTransaction } from "../../api/apiClient";
import { getKyc, getLivelinessData, getTransactionId } from "../selectors/kyc";
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

    if (documentType === DOC_TYPE_EID) {
      daysToExpiry <= 10
        ? put(analyseOcrFail(EID_EXPIRY))
        : yield put(analyseOcrSuccessEid(response));
    }
    if (documentType === DOC_TYPE_PASSPORT) {
      const nationalityAsInEid = getOcrFieldValueBySource(analysedEidData?.nationalityIso2, "mrz");
      if (nationalityAsInEid !== nationality) {
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

export function* createFaceScanSaga() {
  try {
    const transactionId = yield select(getTransactionId);
    const response = yield call(analyzeOcrData.getFaceScanKey, transactionId);
    yield put(createFaceScanKeySuccess(response));
  } catch (error) {
    log(error);
  }
}

export function* checkFaceLiveliness({ payload }) {
  try {
    const transactionId = yield select(getTransactionId);
    const response = yield call(analyzeOcrData.postFaceLiveliness, transactionId, payload);
    yield put(saveFaceLivelinessFeedback(response.data));
  } catch (error) {
    log(error);
  }
}

export function* setLivelinessData({ payload }) {
  try {
    const livelinessData = yield select(getLivelinessData);
    const transactionId = yield select(getTransactionId);
    yield call(
      analyzeOcrData.validateAndConfirmIdentity,
      transactionId,
      livelinessData.data,
      livelinessData.datahash
    );
    yield put(validateIdentitySuccess());
  } catch (error) {
    let message = error?.response?.data?.message;
    yield put(validateIdentityFail(message));
    log(error);
  }
}

export default function* KycTransactionSaga() {
  yield all([
    takeLatest(CREATE_KYC_TRANSACTION, createKycTransactionSaga),
    takeLatest(ANALYSE_OCR, analyseOcrDataSaga),
    takeLatest(CREATE_FACE_SCAN_KEY, createFaceScanSaga),
    takeLatest(CHECK_FACE_LIVELINESS, checkFaceLiveliness),
    takeLatest(SET_LIVELINESS_DATA, setLivelinessData)
  ]);
}
