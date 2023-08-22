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
  saveSignatoryModel,
  saveOrganizationInfoModel,
  UPDATE_ADDITIONAL_INFO
} from "../actions/appConfig";
import { sendProspectToAPI, sendProspectToAPISuccess } from "../actions/sendProspectToAPI";
import { config } from "../../api/apiClient";
import { UAE_CODE, UAE_CURRENCY, AUTO } from "../../constants";
import {
  getIsIslamicBanking,
  getAccountType,
  getProspect,
  getLeadSource,
  getRoCode,
  getAdditionalInfoDetailsForBPM
} from "../selectors/appConfig";
import { log } from "../../utils/loggger";

import appConfig from "../../config/appConfig.json";

const populateAppConfig = configApiResponse => ({
  ...appConfig,
  ...configApiResponse
});

export function* receiveAppConfigSaga() {
  try {
    let response = null;
    response = yield call(config.load);

    const newConfig = populateAppConfig(response.data);
    const signatoryModel = newConfig.prospect
      ? cloneDeep(newConfig.prospect.signatoryInfo[0])
      : null;
    const organizationInfoModel = newConfig.prospect
      ? cloneDeep(newConfig.prospect.organizationInfo)
      : null;

    if (newConfig.prospect) {
      newConfig.prospect.signatoryInfo = [];
      newConfig.prospect.accountInfo.accountCurrency = UAE_CURRENCY;
      if (!newConfig.prospect.applicantInfo.countryCode) {
        newConfig.prospect.applicantInfo.countryCode = UAE_CODE;
      }
      newConfig.prospect.applicantInfo.LeadSource = yield select(getLeadSource);
      newConfig.prospect.applicantInfo.roCode = yield select(getRoCode);
      newConfig.prospect.applicationInfo.accountType = yield select(getAccountType);
      newConfig.prospect.applicationInfo.islamicBanking = yield select(getIsIslamicBanking);
    }

    if (signatoryModel) {
      yield put(saveSignatoryModel(signatoryModel));
    }
    if (organizationInfoModel) {
      yield put(saveOrganizationInfoModel(organizationInfoModel));
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

function* updateAdditionInfo({ payload }) {
  try {
    const additionalInfoDetailsForBPM = yield select(getAdditionalInfoDetailsForBPM);
    console.log(additionalInfoDetailsForBPM, "additionalInfoDetailsForBPM");
    // Create a copy of the original array
    const updatedInfoBPM = [...additionalInfoDetailsForBPM];

    // Check if a matching QueryUniqueID exists in updatedInfoBPM
    const existingIndex = updatedInfoBPM.findIndex(
      info => info.QueryUniqueID === payload.QueryUniqueID
    );

    if (existingIndex !== -1) {
      // If it exists, update the QueryResponse in the copy
      updatedInfoBPM[existingIndex].QueryResponse = payload.QueryResponse;
    } else {
      // If it doesn't exist, add a new object to the copy
      updatedInfoBPM.push({
        QueryUniqueID: payload.QueryUniqueID,
        QueryResponse: payload.QueryResponse
      });
    }
    yield put(
      updateProspect({ "prospect.additionalDataForBPM.additionalInfoBPM": updatedInfoBPM })
    );
  } catch (e) {
    log(e);
  }
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RECEIVE_APPCONFIG, receiveAppConfigSaga),
    takeLatest(UPDATE_PROSPECT, updateProspectSaga),
    takeLatest(UPDATE_VIEW_ID, updateViewIdSaga),
    takeLatest(UPDATE_ADDITIONAL_INFO, updateAdditionInfo)
  ]);
}
