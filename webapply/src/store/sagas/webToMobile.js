import { all, call, delay, put, select, take, takeEvery, takeLatest } from "redux-saga/effects";
import { webToMobile } from "../../api/apiClient";
import { configureKYCTransactionAPIClient } from "../../api/axiosConfig";
import { WTM_STATUS } from "../../constants";
import { log } from "../../utils/loggger";
import { updateProspect, updateProspectId } from "../actions/appConfig";
import { KycTransactionSuccess } from "../actions/kyc";
import {
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
      data: { kycTransaction, prospectId, fullname },
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
        "prospect.applicantInfo.fullName": fullname
      })
    );
    yield put(updateProspectId(prospectId));
    yield put(setSessionData(sessionDetails));
    yield put(KycTransactionSuccess(kycTransactionData));
  } catch (error) {
    log(error);
  }
}

function* schedulerWorker() {
  while (true) {
    yield call(updateStatus(WTM_STATUS.IN_PROGRESS));
    const action = yield take([STOP_SCHEDULER]);
    if (action.type === STOP_SCHEDULER) {
      yield call(updateStatus(WTM_STATUS.FINISHED));
      break;
    }
    yield delay(process.env.REACT_APP_WTM_SCHEDULER_INTERVAL);
  }
}

function* updateStatus({ payload }) {
  const prospectId = yield select(getProspectId);
  const headers = yield select(getAuthorizationHeader);
  const {
    sessionData: { webMobileRefId }
  } = yield select(getwtmSessionDetails);
  yield call(webToMobile.wtmStatusUpdate, { status: payload }, headers, prospectId, webMobileRefId);
}

function* schedulerWatcher() {
  yield takeEvery(START_SCHEDULER, schedulerWorker);
}

export default function* webToMobileSaga() {
  yield all([takeLatest(SYNC_SESSION, SyncSession), schedulerWatcher()]);
}
