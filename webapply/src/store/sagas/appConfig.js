import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_FIELD,
  updateProspect
} from "../actions/appConfig";
import { getAppConfig } from "../../api/appConfig";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";

function* receiveAppConfigSaga() {
  try {
    const response = yield call(getAppConfig);
    yield put(receiveAppConfigSuccess(response.data));
  } catch (error) {
    console.error(error);
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
    takeLatest(UPDATE_FIELD, updateFieldSaga)
  ]);
}
