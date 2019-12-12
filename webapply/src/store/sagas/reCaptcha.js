import { all, call, put, takeLatest, select } from "redux-saga/effects";
import get from "lodash/get";

import { setPending, setVerified, setError, VERIFY_TOKEN } from "../actions/reCaptcha";
import apiClient from "../../api/apiClient";
import { getReCaptchaToken } from "../selectors/reCaptcha";
import { log } from "../../utils/loggger";

function* verifyToken() {
  try {
    const state = yield select();

    yield put(setPending(true));
    yield call(apiClient.reCaptcha.verify, getReCaptchaToken(state));
    yield put(setVerified(true));
  } catch (error) {
    log(error);
    yield put(setError(get(error, "data.message") || get(error, "message")));
  }
}

export default function* appConfigSaga() {
  yield all([takeLatest(VERIFY_TOKEN, verifyToken)]);
}
