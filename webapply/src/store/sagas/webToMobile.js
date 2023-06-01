import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { webToMobile } from "../../api/apiClient";
import { configureKYCTransactionAPIClient } from "../../api/axiosConfig";
import { log } from "../../utils/loggger";
import { updateProspect, updateProspectId } from "../actions/appConfig";
import { KycTransactionSuccess } from "../actions/kyc";
import {
  clearSession,
  // scheduledAction,
  setSessionData,
  START_SCHEDULER,
  STOP_SCHEDULER,
  SYNC_SESSION
} from "../actions/webToMobile";
import { getAuthorizationHeader, getProspectId } from "../selectors/appConfig";
import { getwtmSessionDetails } from "../selectors/webToMobile";

function* SyncSession({ payload }) {
  try {
    const response = yield call(webToMobile.wtmSyncSession, { tempToken: payload });
    const {
      data: { kycTransaction, prospectId, fullname, isIslamicBanking, companyCategory },
      webMobileRefId,
      SID,
      status,
      type
    } = response.data;
    const kycTransactionData = {
      kycTransactionId: kycTransaction.id,
      kycUserToken: kycTransaction.userToken
    };
    configureKYCTransactionAPIClient(kycTransaction.id, kycTransaction.userToken);

    const sessionDetails = {
      sessionType: type,
      webMobileRefId,
      status,
      SID,
      prospectId
    };
    yield put(
      updateProspect({
        "prospect.applicantInfo.fullName": fullname,
        "prospect.applicationInfo.islamicBanking": isIslamicBanking,
        "prospect.organizationInfo.companyCategory": companyCategory
      })
    );
    yield put(updateProspectId(prospectId));
    yield put(setSessionData(sessionDetails));
    yield put(KycTransactionSuccess(kycTransactionData));
  } catch (error) {
    log(error);
  }
}

function* schedulerWorker({ payload, type }) {
  while (true) {
    yield call(updateStatus, payload);
    if (type === STOP_SCHEDULER) {
      yield call(updateStatus, payload);
      yield put(clearSession);
      break;
    }
    yield delay(process.env.REACT_APP_WTM_SCHEDULER_INTERVAL);
  }
}

function* updateStatus(payload) {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const {
      sessionData: { webMobileRefId }
    } = yield select(getwtmSessionDetails);
    yield call(
      webToMobile.wtmStatusUpdate,
      { status: payload },
      headers,
      prospectId,
      webMobileRefId
    );
  } catch (error) {
    log(error);
  }
}

export default function* webToMobileSaga() {
  yield all([
    takeLatest(SYNC_SESSION, SyncSession),
    takeLatest(START_SCHEDULER, schedulerWorker),
    takeLatest(STOP_SCHEDULER, schedulerWorker)
  ]);
}
