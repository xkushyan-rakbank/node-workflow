import { all, call, put, takeLatest, takeEvery, select } from "redux-saga/effects";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_PROSPECT,
  setProspect,
  updateProspect,
  UPDATE_ACTION_TYPE,
  UPDATE_VIEW_ID,
  DISPLAY_SCREEN_BASED_ON_VIEW_ID,
  ADD_NEW_STAKEHOLDER,
  DELETE_STAKEHOLDER
} from "../actions/appConfig";
import apiClient from "../../api/apiClient";
import { history } from "./../configureStore";
import { getApplicationInfo } from "../selectors/appConfig";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import routes from "./../../routes";

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

  for (let name in action.fields) {
    set(config, name, action.fields[name]);
  }

  yield put(setProspect(config));
}

function* updateActionTypeSaga({ actionType }) {
  yield put(updateProspect({ "prospect.applicationInfo.actionType": actionType }));
}

function* updateViewIdSaga({ viewId }) {
  yield put(updateProspect({ "prospect.applicationInfo.viewId": viewId }));
}

function* displayScreenBasedOnViewIdSaga() {
  const state = yield select();
  const applicationInfo = getApplicationInfo(state);

  if (applicationInfo.actionType === "submit" && applicationInfo.retrieveMode) {
    yield call(history.push, routes.ApplicationSubmitted);
  } else if (applicationInfo.actionType === "submit" && !applicationInfo.retrieveMode) {
    yield call(history.push, applicationInfo.reUploadDocuments);
  } else if (applicationInfo.viewId) {
    yield call(history.push, applicationInfo.viewId);
  }
}

function* addNewStakeholderSaga() {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  config.prospect.signatoryInfo.push({});

  yield put(setProspect(config.prospect));
}

function* deleteStakeholderSaga(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const updatedSignatories = config.prospect.signatoryInfo.filter(
    item => item.signatoryId !== action.stakeholderId
  );

  config.prospect.signatoryInfo = updatedSignatories;

  yield put(setProspect(config.prospect));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeEvery(UPDATE_PROSPECT, updateProspectSaga),
    takeEvery(UPDATE_ACTION_TYPE, updateActionTypeSaga),
    takeEvery(UPDATE_VIEW_ID, updateViewIdSaga),
    takeEvery(DISPLAY_SCREEN_BASED_ON_VIEW_ID, displayScreenBasedOnViewIdSaga),
    takeEvery(ADD_NEW_STAKEHOLDER, addNewStakeholderSaga),
    takeEvery(DELETE_STAKEHOLDER, deleteStakeholderSaga)
  ]);
}
