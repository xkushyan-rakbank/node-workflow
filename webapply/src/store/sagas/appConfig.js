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
  UPDATE_VIEW_ID,
  saveSignatoryModel
} from "../actions/appConfig";
import { sendProspectToAPI, sendProspectToAPISuccess } from "../actions/sendProspectToAPI";
import { config } from "../../api/apiClient";
import { accountNames, UAE_CODE, UAE, UAE_CURRENCY, AUTO } from "../../constants";
import {
  getIsIslamicBanking,
  getAccountType,
  getProspect,
  getLeadSource,
  getRoCode
} from "../selectors/appConfig";
import { log } from "../../utils/loggger";

export function* receiveAppConfigSaga() {
  try {
    const accountType = yield select(getAccountType);
    let response = null;

    if (accountType) {
      response = yield call(config.load, accountType);
    } else {
      /* istanbul ignore if  */
      if (process.env.NODE_ENV === "development") {
        response = yield call(config.load, accountNames.starter);
      } else {
        response = yield call(config.load, null);
      }
    }

    const newConfig = response.data;
    const signatoryModel = newConfig.prospect
      ? cloneDeep(newConfig.prospect.signatoryInfo[0])
      : null;

    if (newConfig.prospect) {
      newConfig.prospect.signatoryInfo = [];
      newConfig.prospect.accountInfo[0].accountCurrency = UAE_CURRENCY;
      if (!newConfig.prospect.applicantInfo.countryCode) {
        newConfig.prospect.applicantInfo.countryCode = UAE_CODE;
      }
      newConfig.prospect.applicantInfo.LeadSource = yield select(getLeadSource);
      newConfig.prospect.applicantInfo.roCode = yield select(getRoCode);
      newConfig.prospect.applicationInfo.accountType = yield select(getAccountType);
      newConfig.prospect.applicationInfo.islamicBanking = yield select(getIsIslamicBanking);
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].country = UAE;
      newConfig.prospect.organizationInfo.addressInfo[0].addressDetails[0].preferredAddress = "Y";
    }

    if (signatoryModel) {
      yield put(saveSignatoryModel(signatoryModel));
    }
    yield put(receiveAppConfigSuccess(newConfig));
    yield put(sendProspectToAPISuccess());
  } catch (error) {
    log(error);
    yield put(receiveAppConfigFail(error));
  }
}

export function* updateProspectSaga(action) {
  const state = yield select();
  const prospect = cloneDeep(getProspect(state));
  const newConfig = {
    ...state.appConfig,
    prospect
  };

  for (let name in action.payload) {
    set(newConfig, name, action.payload[name]);
  }

  yield put(setConfig(newConfig));
}

export function* updateViewIdSaga({ payload: { viewId, isSendToApi } }) {
  yield put(updateProspect({ "prospect.applicationInfo.viewId": viewId }));
  if (isSendToApi) {
    yield put(sendProspectToAPI(AUTO));
  }
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeLatest(UPDATE_PROSPECT, updateProspectSaga),
    takeLatest(UPDATE_VIEW_ID, updateViewIdSaga)
  ]);
}
