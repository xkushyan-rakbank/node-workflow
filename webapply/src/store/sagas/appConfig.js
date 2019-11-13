import { all, call, put, takeLatest, select } from "redux-saga/effects";
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_PROSPECT,
  RESET_PROSPECT,
  setConfig,
  setProspect,
  updateProspect,
  UPDATE_ACTION_TYPE,
  UPDATE_VIEW_ID,
  DISPLAY_SCREEN_BASED_ON_VIEW_ID,
  UPDATE_SAVE_TYPE,
  saveProspectModel
} from "../actions/appConfig";
import apiClient from "../../api/apiClient";
import { history } from "./../configureStore";
import { getEndpoints, getApplicationInfo } from "../selectors/appConfig";
import { getSelectedAccountInfo } from "../selectors/selectedAccountInfo";
import { sendProspectToAPISuccess } from "../actions/sendProspectToAPI";
import routes from "./../../routes";

function* receiveAppConfigSaga() {
  try {
    const state = yield select();
    const endpoints = getEndpoints(state);
    const pathname = window.location.pathname;
    let response = null;
    const segment = pathname.includes("/agent")
      ? state.login.loginStatus
        ? state.appConfig.searchInfo.segment
        : ""
      : pathname.substring(1, pathname.lastIndexOf("/"));
    const { accountType, islamicBanking } = getSelectedAccountInfo(state);

    const applicationInfoFields = {
      "prospect.applicationInfo.accountType": accountType,
      "prospect.applicationInfo.islamicBanking": islamicBanking
    };

    if (!isEmpty(endpoints)) {
      const product = getApplicationInfo.accountType;
      response = yield call(apiClient.config.load, product, segment);
    } else {
      response = yield call(apiClient.config.load, null, segment);
    }

    const config = cloneDeep(response.data);
    const prospectModel = cloneDeep(config.prospect);
    if (config.prospect) {
      config.prospect.signatoryInfo = [];
    }

    yield put(saveProspectModel(prospectModel));
    yield put(receiveAppConfigSuccess(config));
    yield put(updateProspect(applicationInfoFields));
    yield put(sendProspectToAPISuccess(config.prospect));
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

  yield put(setConfig(config));
}

function* displayScreenBasedOnViewIdSaga() {
  const state = yield select();
  const applicationInfo = getApplicationInfo(state);

  const prefix = "/sme";

  if (applicationInfo.actionType === "submit" && applicationInfo.retrieveMode) {
    yield call(history.push, prefix + routes.ApplicationSubmitted);
  } else if (applicationInfo.actionType === "submit" && !applicationInfo.retrieveMode) {
    yield call(history.push, prefix + applicationInfo.reUploadDocuments);
  } else if (applicationInfo.viewId) {
    yield call(history.push, prefix + applicationInfo.viewId);
  }
}

function* updateActionTypeSaga({ actionType }) {
  yield put(updateProspect({ "prospect.applicationInfo.actionType": actionType }));
}

function* resetProspectSaga() {
  const state = yield select();
  const prospect = state.sendProspectToAPI.prospectCopy;

  yield put(setProspect(prospect));
}

function* updateViewIdSaga({ viewId }) {
  yield put(
    updateProspect({
      "prospect.applicationInfo.viewId": viewId.replace("/sme", "").replace("/agent", "")
    })
  );
}

function* updateSaveTypeSaga({ saveType }) {
  yield put(updateProspect({ "prospect.applicationInfo.saveType": saveType }));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeLatest(UPDATE_PROSPECT, updateProspectSaga),
    takeLatest(DISPLAY_SCREEN_BASED_ON_VIEW_ID, displayScreenBasedOnViewIdSaga),
    takeLatest(UPDATE_ACTION_TYPE, updateActionTypeSaga),
    takeLatest(UPDATE_VIEW_ID, updateViewIdSaga),
    takeLatest(UPDATE_SAVE_TYPE, updateSaveTypeSaga),
    takeLatest(RESET_PROSPECT, resetProspectSaga)
  ]);
}
