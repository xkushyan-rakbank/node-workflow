import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_FIELD,
  updateProspect
} from "../actions/appConfig";
import { getAppConfig } from "../../api/appConfig";

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
  const prospect = state.appConfig.prospect;
  state[action.data.name] = action.data.value;
  console.log("prospect", prospect);
  yield put(updateProspect(prospect));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeLatest(UPDATE_FIELD, updateFieldSaga)
  ]);
}
