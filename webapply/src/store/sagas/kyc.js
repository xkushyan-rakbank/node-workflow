import { all, call, put, select, takeLatest, fork } from "redux-saga/effects";

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
  saveFaceLivelinessFeedbackError,
  notifyHostSuccess,
  notifyHostError,
  NOTIFY_HOST,
  loadEidDocuments,
  loadPassportDocuments,
  loadConfirmEntity,
  GET_KYC_STATUS,
  getKycSuccess,
  getKycError,
  analyseOcrAgeRestriction
} from "../actions/kyc";
import {
  getAuthorizationHeader,
  getCompanyTradeLicenseNumber,
  getDatalist,
  getOrganizationInfo,
  getProspectId,
  getSignatories
} from "../selectors/appConfig";
import { analyzeOcrData, createKYCTransaction, getOCRDataStatus } from "../../api/apiClient";
import { getKyc, getLivelinessData, getTransactionId } from "../selectors/kyc";
import { log } from "../../utils/loggger";
import {
  DOC_TYPE_EID,
  DOC_TYPE_PASSPORT,
  EID_EXPIRY,
  ERROR_MESSAGES,
  DOC_MISMATCH,
  PASSPORT_EXPIRY,
  INVALID_DOCUMENT,
  screeningStatus,
  EFR_CHECK_ERROR,
  APP_STOP_SCREEN_RESULT,
  screeningStatusDefault,
  SCREENING_FAIL_REASONS,
  applicationError,
  AGE_RESTRICTION
} from "../../constants";
import { setScreeningError } from "../actions/sendProspectToAPI";
import routes from "../../routes";
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
    const age = getOcrFieldValueBySource(response?.age, "mrz");

    if (documentType === DOC_TYPE_EID) {
      parseInt(daysToExpiry) <= 10
        ? yield put(analyseOcrFail(EID_EXPIRY))
        : yield put(analyseOcrSuccessEid(response));
      if (age < 18) {
        yield put(analyseOcrAgeRestriction(AGE_RESTRICTION));
      }
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

export function* setScreeningResults({ preScreening }) {
  const currScreeningType = preScreening.screeningResults.find(screeningResult =>
    SCREENING_FAIL_REASONS.includes(screeningResult.screeningReason)
  );

  let screenError = screeningStatus.find(
    ({ screeningType }) => screeningType === (currScreeningType || {}).screeningType
  );

  if (screenError) {
    //ro-assist-brd1-3
    if (
      screenError.screeningType?.toLowerCase() === screeningStatus[1].screeningType.toLowerCase()
    ) {
      let buttons = applicationError.find(
        ({ screeningNotes }) =>
          screeningNotes.toLowerCase() === currScreeningType.screeningNotes?.toLowerCase()
      );
      if (buttons !== undefined) {
        screenError = { ...screenError, ...buttons };
      }
    }

    yield put(
      setScreeningError({
        ...screenError,
        text: currScreeningType.reasonNotes,
        icon: ""
      })
    );
  } else {
    yield put(setScreeningError(screeningStatusDefault));
  }
}

export function* notifyHost() {
  try {
    const transactionId = yield select(getTransactionId);
    const signatoryDetails = yield select(getSignatories);
    const notifyHostResponse = yield call(analyzeOcrData.notifyHost, transactionId);
    const { preScreening } = notifyHostResponse;

    const isScreeningError = preScreening && preScreening.statusOverAll === APP_STOP_SCREEN_RESULT;

    if (isScreeningError) {
      yield fork(setScreeningResults, notifyHostResponse);
    } else if (notifyHostResponse) {
      yield put(notifyHostSuccess(notifyHostResponse));
      const {
        signatoryInfo,
        documents: { stakeholdersDocuments }
      } = notifyHostResponse;
      signatoryInfo[0].editedFullName =
        signatoryDetails[0].editedFullName || signatoryInfo[0].fullName;
      //Name on card for account info screen
      yield put(
        updateProspect({
          "prospect.signatoryInfo": signatoryInfo,
          "prospect.documents.stakeholdersDocuments": stakeholdersDocuments
        })
      );
    }
  } catch (error) {
    let message = error?.response?.data?.message;
    const notificationOptions = { title: "Oops", message: error.message };
    NotificationsManager.add(notificationOptions);
    yield put(notifyHostError(message));
    log(error);
  }
}

export function* entityConfirmation(tlia) {
  const { licenseOrCOINumber, licenseOrCOIExpiryDate, dateOfIncorporation } = yield select(
    getOrganizationInfo
  );

  const data = {
    tradeLicenseNumber: licenseOrCOINumber,
    expiryDate: licenseOrCOIExpiryDate,
    creationDate: dateOfIncorporation
  };

  try {
    const livelinessData = yield select(getLivelinessData);
    const transactionId = yield select(getTransactionId);
    yield put(resetFormStep(true));
    yield call(
      analyzeOcrData.entityConfirmation,
      transactionId,
      livelinessData.data,
      livelinessData.datahash,
      { ...data, issuingAuthority: parseInt(tlia.displayText) }
    );
    yield put(
      validateEntityConfirmSuccess({
        success: true,
        issuingAuthority: tlia.code,
        ...data
      })
    );
  } catch (error) {
    let message = error?.response?.data?.message;
    if (error?.response?.status === 403 && error?.response?.data?.errorCode === "024") {
      let screenError = screeningStatus.find(
        ({ screeningType }) => screeningType === error?.response?.status
      );
      let buttons = [
        {
          external: false,
          link: routes.quickapplyLanding,
          label: "Go to home page"
        }
      ];
      if (buttons !== undefined) {
        screenError = { ...screenError, ...buttons };
      }

      yield put(
        setScreeningError({
          ...screenError,
          text: EFR_CHECK_ERROR,
          icon: "",
          screeningType: 403
        })
      );
      yield put(
        validateEntityConfirmSuccess({ success: true, ...data, issuingAuthority: tlia.code })
      );
    } else {
      yield put(validateEntityConfirmFail(null));
      const notificationOptions = { title: "Oops", message };
      NotificationsManager.add(notificationOptions);
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
    const { licenseIssuingAuthority } = yield select(getOrganizationInfo);
    const { tliaForMOI } = yield select(getDatalist);
    const filteredlicenseIssuingAuthority = tliaForMOI.filter(
      tlia => tlia?.value === licenseIssuingAuthority
    );
    yield call(
      analyzeOcrData.validateAndConfirmIdentity,
      transactionId,
      livelinessData.data,
      livelinessData.datahash
    );
    yield put(validateIdentitySuccess());
    if (filteredlicenseIssuingAuthority?.length) {
      yield call(entityConfirmation, filteredlicenseIssuingAuthority[0]);
    } else {
      yield put(
        validateEntityConfirmSuccess({
          success: true
        })
      );
    }
  } catch (error) {
    if (error?.response?.status === 403 && error?.response?.data?.errorCode === "017") {
      let screenError = screeningStatus.find(
        ({ screeningType }) => screeningType === error?.response?.status
      );
      let buttons = [
        {
          external: false,
          link: routes.quickapplyLanding,
          label: "Go to home page"
        }
      ];
      if (buttons !== undefined) {
        screenError = { ...screenError, ...buttons };
      }

      yield put(
        setScreeningError({
          ...screenError,
          text: EFR_CHECK_ERROR,
          icon: "",
          screeningType: 403
        })
      );
    }
    let message = error?.response?.data?.message;
    yield put(validateIdentityFail(message));
    log(error);
  }
}

function* getEidDocuments(transactionId) {
  try {
    return yield call(getOCRDataStatus.getOCRStageData, transactionId, "EID_OCR");
  } catch (error) {
    log(error);
  }
}

function* getPassportDocuments(transactionId) {
  try {
    return yield call(getOCRDataStatus.getOCRStageData, transactionId, "PASSPORT_OCR");
  } catch (error) {
    log(error);
  }
}

const extractOCRData = payload => {
  let eidFront = payload.documentDetails.find(eachDoc => eachDoc.documentType === "EID_FRONT")
    ?.documentContent;
  let eidBack = payload.documentDetails.find(eachDoc => eachDoc.documentType === "EID_BACK")
    ?.documentContent;
  let passport = payload.documentDetails.find(eachDoc => eachDoc.documentType === "PASSPORT_FRONT")
    ?.documentContent;
  return {
    efrResponse: payload.efrResponse,
    eidFront,
    eidBack,
    passport
  };
};

function* putOcrData(transactionId) {
  const eidDocuments = yield call(getEidDocuments, transactionId);
  const passportDocuments = yield call(getPassportDocuments, transactionId);
  const eidOcrDetails = extractOCRData(eidDocuments);
  const passportDetails = extractOCRData(passportDocuments);
  yield put(loadEidDocuments(eidOcrDetails));
  yield put(loadPassportDocuments(passportDetails));
}

export function* getCurrentKYCStatus() {
  try {
    const transactionId = yield select(getTransactionId);
    const stagesResponse = yield call(getOCRDataStatus.getOCRStatus, transactionId);
    const tradeLicenseNumber = yield select(getCompanyTradeLicenseNumber);
    const stageInfo = stagesResponse.stageInfo;
    let stageInfoMap = {};
    stageInfo.forEach(eachStage => {
      stageInfoMap[eachStage.stage] = eachStage.isCompleted;
    });
    if (stageInfoMap["CONFIRM_ENTITY"]) {
      yield call(putOcrData, transactionId);
      yield put(loadConfirmEntity({ success: true, tradeLicenseNumber }));
    } else if (stageInfoMap["PASSPORT_OCR"]) {
      yield call(putOcrData, transactionId);
    } else if (stageInfoMap["EID_OCR"]) {
      const eidDocuments = yield call(getEidDocuments, transactionId);
      const eidOcrDetails = extractOCRData(eidDocuments);
      yield put(loadEidDocuments(eidOcrDetails));
    }
    yield put(getKycSuccess(true));
  } catch (error) {
    yield put(getKycError(error));
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
    takeLatest(NOTIFY_HOST, notifyHost),
    takeLatest(GET_KYC_STATUS, getCurrentKYCStatus)
  ]);
}
