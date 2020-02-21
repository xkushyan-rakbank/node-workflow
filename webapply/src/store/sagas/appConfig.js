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
  UPDATE_SAVE_TYPE,
  saveProspectModel
} from "../actions/appConfig";
import { updateStakeholdersIds } from "../actions/stakeholders";
import { sendProspectToAPI, sendProspectToAPISuccess } from "../actions/sendProspectToAPI";

import { config } from "../../api/apiClient";
import {
  accountNames,
  UAE_CODE,
  UAE,
  UAE_CURRENCY,
  CONVENTIONAL_BANK,
  ISLAMIC_BANK,
  CONTINUE
} from "../../constants";
import { getEndpoints, getIsIslamicBanking, getAccountType } from "../selectors/appConfig";

function* receiveAppConfigSaga({ payload }) {
  try {
    const state = yield select();

    const endpoints = getEndpoints(state);
    let response = null;

    const accountType = Object.values(accountNames).includes(payload.accountType)
      ? payload.accountType
      : getAccountType(state);

    if (!isEmpty(endpoints)) {
      response = yield call(config.load, accountType);
    } else {
      if (process.env.NODE_ENV === "development") {
        response = yield call(config.load, accountNames.starter);
      } else {
        response = yield call(config.load, null);
      }
    }

    const newConfig = cloneDeep(response.data);
    const prospectModel = cloneDeep(newConfig.prospect);
    if (newConfig.prospect) {
      newConfig.prospect.signatoryInfo = [];
      newConfig.prospect.accountInfo[0].accountCurrency = UAE_CURRENCY;
      if (!newConfig.prospect.applicantInfo.countryCode) {
        newConfig.prospect.applicantInfo.countryCode = UAE_CODE;
      }
      newConfig.prospect.applicationInfo.accountType = accountType;
      newConfig.prospect.applicationInfo.islamicBanking = [
        CONVENTIONAL_BANK,
        ISLAMIC_BANK
      ].includes(payload.isIslamicBanking)
        ? payload.isIslamicBanking === ISLAMIC_BANK
        : getIsIslamicBanking(state);
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].country = UAE;
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].preferredAddress = "Y";
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

function* updateViewIdSaga({ payload: { viewId, isSendToApi } }) {
  yield put(updateProspect({ "prospect.applicationInfo.viewId": viewId }));
  if (isSendToApi) {
    yield put(sendProspectToAPI(CONTINUE));
  }
}

function* updateSaveTypeSaga({ saveType }) {
  yield put(updateProspect({ "prospect.applicationInfo.saveType": saveType }));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeLatest(UPDATE_PROSPECT, updateProspectSaga),
    takeLatest(UPDATE_ACTION_TYPE, updateActionTypeSaga),
    takeLatest(UPDATE_VIEW_ID, updateViewIdSaga),
    takeLatest(UPDATE_SAVE_TYPE, updateSaveTypeSaga),
    takeLatest(RESET_PROSPECT, resetProspectSaga)
  ]);
}
