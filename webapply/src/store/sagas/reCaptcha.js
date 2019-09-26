import { all, call, put, takeLatest, select } from "redux-saga/effects";
import get from "lodash/get";
import * as actions from "../actions/reCaptcha";
import apiClient from "../../api/apiClient";
import { getReCaptchaToken } from "../selectors/reCaptcha";

function* verifyToken() {
  try {
    const state = yield select();
    yield put(actions.setPending(true));

    yield call(apiClient.reCaptcha.verify, getReCaptchaToken(state));
    yield put(actions.setVerified(true));
  } catch (error) {
    console.log(error);
    yield put(actions.setError(get(error, "data.message") || get(error, "message")));
  }
}

export default function* appConfigSaga() {
  yield all([takeLatest(actions.VERIFY_TOKEN, verifyToken)]);
}
