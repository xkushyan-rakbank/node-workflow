import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select
} from "redux-saga/effects";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_FIELD,
  updateProspect
} from "../actions/appConfig";
import apiClient from "../../api/apiClient";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

function* receiveAppConfigSaga() {
  try {
    const response = yield call(apiClient.config.get);
    yield put(receiveAppConfigSuccess(response.data));
  } catch (error) {
    yield put(receiveAppConfigFail(error));
  }
}

function* updateFieldSaga(action) {
  const state = yield select();
  const config = state.appConfig;
  set(config, action.data.name, action.data.value);
  yield put(updateProspect(cloneDeep(config.prospect)));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeEvery(UPDATE_FIELD, updateFieldSaga)
  ]);
}
