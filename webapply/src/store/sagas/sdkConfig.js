import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { CREATE_SDK_CONFIG, createSdkCofigSuccess } from "../actions/sdkConfig";

import { getSdkConfiguration } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getTransactionId } from "../selectors/kyc";

export function* createSdkConfigSaga() {
  try {
    const transactionId = yield select(getTransactionId);
    const response = yield call(getSdkConfiguration.get, transactionId);
    yield put(createSdkCofigSuccess(response));
  } catch (error) {
    log(error);
  }
}

export default function* sdkConfigSaga() {
  yield all([takeLatest(CREATE_SDK_CONFIG, createSdkConfigSaga)]);
}
