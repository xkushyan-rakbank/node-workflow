import { all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_PROSPECT,
  setProspect
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

function* updateProspectSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  console.log(action.fields);
  for (let name in action.fields) {
    console.log(name, action.fields[name]);
    set(config, name, action.fields[name]);
  }

  yield put(setProspect(config.prospect));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeEvery(UPDATE_PROSPECT, updateProspectSaga)
  ]);
}
