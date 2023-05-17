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
  validateIdentityFail,
  validateEntityConfirmSuccess,
  validateEntityConfirmFail,
  ENTITY_CONFIRMATION,
  saveFaceLivelinessFeedbackError,
  notifyHostSuccess,
  notifyHostError
} from "../actions/kyc";
import {
  getAuthorizationHeader,
  getCompanyTradeLicenseNumber,
  getProspectId
} from "../selectors/appConfig";
import { analyzeOcrData, createKYCTransaction } from "../../api/apiClient";
import { getKyc, getLivelinessData, getTransactionId } from "../selectors/kyc";
import { log } from "../../utils/loggger";
import {
  DOC_TYPE_EID,
  DOC_TYPE_PASSPORT,
  EID_EXPIRY,
  ERROR_MESSAGES,
  DOC_MISMATCH,
  PASSPORT_EXPIRY,
  INVALID_DOCUMENT
} from "../../constants";
import { checkDocumentValid, getOcrFieldValueBySource } from "../../utils/ocr";
import { NotificationsManager } from "../../components/Notification";
import { resetFormStep } from "../actions/sendProspectToAPI";
import { updateProspect } from "../actions/appConfig";

export function* createKycTransactionSaga() {
  try {
    const headers = yield select(getAuthorizationHeader);
    const prospectId = yield select(getProspectId);
    const individualId = "SID1";
    const response = yield call(createKYCTransaction.send, prospectId, individualId, headers);
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
    const isDocumentValid = documentType === DOC_TYPE_EID ? checkDocumentValid(response) : true;

    if (!response || !isDocumentValid) {
      yield put(analyseOcrFail(INVALID_DOCUMENT));
      return;
    }

    const daysToExpiry = getOcrFieldValueBySource(response?.daysToExpiry, "visual");
    const nationality = getOcrFieldValueBySource(response?.nationalityIso2, "mrz");

    if (documentType === DOC_TYPE_EID) {
      parseInt(daysToExpiry) <= 10
        ? yield put(analyseOcrFail(EID_EXPIRY))
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
    const notificationOptions = { title: "Oops", message: error.message };
    NotificationsManager.add(notificationOptions);
    yield put(saveFaceLivelinessFeedbackError());
    log(error);
  }
}

export function* notifyHost() {
  try {
    const transactionId = yield select(getTransactionId);
    const notifyHostResponse = yield call(analyzeOcrData.notifyHost, transactionId);
    yield put(notifyHostSuccess(notifyHostResponse));
    const {
      signatoryInfo,
      documents: { stakeholdersDocuments }
    } = notifyHostResponse;
    yield put(
      updateProspect({
        "prospect.signatoryInfo": signatoryInfo,
        "prospect.documents.stakeholdersDocuments": stakeholdersDocuments
      })
    );
  } catch (error) {
    let message = error?.response?.data?.message;
    yield put(notifyHostError(message));
    log(error);
  }
}

export function* entityConfirmation() {
  try {
    const tradeLicenseNumber = yield select(getCompanyTradeLicenseNumber);
    const livelinessData = yield select(getLivelinessData);
    const transactionId = yield select(getTransactionId);
    yield put(resetFormStep(true));
    const entityConfirmResponse = yield call(
      analyzeOcrData.entityConfirmation,
      transactionId,
      livelinessData.data,
      livelinessData.datahash,
      tradeLicenseNumber
    );
    yield call(notifyHost);
    yield put(validateEntityConfirmSuccess(entityConfirmResponse));
  } catch (error) {
    let message = error?.response?.data?.message;
    if (error?.response?.status === 403) {
      yield call(notifyHost);
      yield put(validateEntityConfirmSuccess(error?.response?.data));
    } else {
      yield put(validateEntityConfirmFail(message));
      yield put(notifyHostError(message));
      log(error);
    }
  } finally {
    yield put(resetFormStep(false));
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
    takeLatest(SET_LIVELINESS_DATA, setLivelinessData),
    takeLatest(ENTITY_CONFIRMATION, entityConfirmation)
  ]);
}
