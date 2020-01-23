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
import { updateStakeholdersIds } from "../actions/stakeholders";
import { sendProspectToAPISuccess } from "../actions/sendProspectToAPI";

import { config, dataList } from "../../api/apiClient";
import { history } from "./..";
import {
  accountNames,
  UAE_CODE,
  UAE,
  UAE_CURRENCY,
  CONVENTIONAL_BANK,
  ISLAMIC_BANK
} from "../../constants";
import {
  getEndpoints,
  getApplicationInfo,
  getIsIslamicBanking,
  getAccountType
} from "../selectors/appConfig";
import routes from "./../../routes";

function* receiveAppConfigSaga({ payload: { accountType, isIslamicBanking } }) {
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

    const newAccountType = Object.values(accountNames).includes(accountType)
      ? accountType
      : getAccountType(state);

    if (!isEmpty(endpoints)) {
      response = yield call(config.load, newAccountType, segment);
    } else {
      if (process.env.NODE_ENV === "development") {
        response = yield call(config.load, accountNames.starter, segment);
      } else {
        response = yield call(config.load, null, segment);
      }
    }

    const dataListResponse = yield call(dataList.get, segment);
    const newConfig = cloneDeep(response.data);
    const prospectModel = cloneDeep(newConfig.prospect);
    if (newConfig.prospect) {
      newConfig.prospect.signatoryInfo = [];
      newConfig.prospect.accountInfo[0].accountCurrency = UAE_CURRENCY;
      if (!newConfig.prospect.applicantInfo.countryCode) {
        newConfig.prospect.applicantInfo.countryCode = UAE_CODE;
      }
      newConfig.prospect.applicationInfo.accountType = newAccountType;
      // prettier-ignore
      // eslint-disable-next-line max-len
      newConfig.prospect.applicationInfo.islamicBanking = [CONVENTIONAL_BANK, ISLAMIC_BANK].includes(isIslamicBanking)
        ? isIslamicBanking === ISLAMIC_BANK
        : getIsIslamicBanking(state);
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].country = UAE;
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].preferredAddress = "Y";
    }

    if (dataListResponse) {
      newConfig.dataList = dataListResponse.data;
    }

    yield put(saveProspectModel(prospectModel));
    yield put(receiveAppConfigSuccess(newConfig));
    yield put(sendProspectToAPISuccess(newConfig.prospect));
  } catch (error) {
    yield put(receiveAppConfigFail(error));
  }
}

function* updateProspectSaga(action) {
  const state = yield select();
  const newConfig = cloneDeep(state.appConfig);
  for (let name in action.fields) {
    set(newConfig, name, action.fields[name]);
  }

  yield put(setConfig(newConfig));
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
  const stakeholdersIds = [...state.stakeholders.stakeholdersIds];
  yield put(setProspect(prospect));

  if (prospect.signatoryInfo.length !== stakeholdersIds.length) {
    stakeholdersIds.pop();
    yield put(updateStakeholdersIds(stakeholdersIds));
  }
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
