import { all, call, put, takeLatest, select } from "redux-saga/effects";
import set from "lodash/set";

import { cloneDeep } from "../../utils/cloneDeep";

import {
  RECEIVE_APPCONFIG,
  receiveAppConfigSuccess,
  receiveAppConfigFail,
  UPDATE_PROSPECT,
  setConfig,
  updateProspect,
  UPDATE_ACTION_TYPE,
  UPDATE_VIEW_ID,
  UPDATE_SAVE_TYPE,
  saveProspectModel
} from "../actions/appConfig";
import { sendProspectToAPI, sendProspectToAPISuccess } from "../actions/sendProspectToAPI";
import { config } from "../../api/apiClient";
import { accountNames, UAE_CODE, UAE, UAE_CURRENCY, CONTINUE } from "../../constants";
import { getIsIslamicBanking, getAccountType, getProspect } from "../selectors/appConfig";
import { log } from "../../utils/loggger";

function* receiveAppConfigSaga() {
  try {
    const state = yield select();
    const accountType = getAccountType(state);
    let response = null;

    if (accountType) {
      response = yield call(config.load, accountType);
    } else {
      if (process.env.NODE_ENV === "development") {
        response = yield call(config.load, accountNames.starter);
      } else {
        response = yield call(config.load, null);
      }
    }

    const newConfig = response.data;
    let prospectModel;

    if (newConfig.prospect) {
      prospectModel = cloneDeep(newConfig.prospect);
      newConfig.prospect.signatoryInfo = [];
      newConfig.prospect.accountInfo[0].accountCurrency = UAE_CURRENCY;
      if (!newConfig.prospect.applicantInfo.countryCode) {
        newConfig.prospect.applicantInfo.countryCode = UAE_CODE;
      }
      newConfig.prospect.applicationInfo.accountType = accountType;
      newConfig.prospect.applicationInfo.islamicBanking = getIsIslamicBanking(state);
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].country = UAE;
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].preferredAddress = "Y";
    }

    if (prospectModel) {
      yield put(saveProspectModel(prospectModel));
    }
    yield put(receiveAppConfigSuccess(newConfig));
    yield put(sendProspectToAPISuccess());
  } catch (error) {
    log(error);
    yield put(receiveAppConfigFail(error));
  }
}

function* updateProspectSaga(action) {
  const state = yield select();
  const prospect = cloneDeep(getProspect(state));
  const newConfig = {
    ...state.appConfig,
    prospect
  };

  for (let name in action.fields) {
    set(newConfig, name, action.fields[name]);
  }

  yield put(setConfig(newConfig));
}

function* updateActionTypeSaga({ actionType }) {
  yield put(updateProspect({ "prospect.applicationInfo.actionType": actionType }));
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
    takeLatest(UPDATE_SAVE_TYPE, updateSaveTypeSaga)
  ]);
}
