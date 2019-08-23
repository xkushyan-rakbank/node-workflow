import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  RECEIVE_UICONFIG,
  reciveUiConfigSuccess,
  reciveUiConfigFail
} from "../actions/uiConfig";
import { getUiConfig } from "../../api/uiConfig";

function* reciveUiConfigSaga(data) {
  try {
    const response = yield call(getUiConfig);
    console.log("response", response);
    // yield put(reciveUiConfigSuccess());
  } catch (error) {
    // yield put(reciveUiConfigFail(error));
  }
}

export default function* uiConfigSaga() {
  yield all([takeLatest(RECEIVE_UICONFIG, reciveUiConfigSaga)]);
}
