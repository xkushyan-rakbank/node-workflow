import { all, call, put, takeLatest, select } from "redux-saga/effects";
import uniqueId from "lodash/uniqueId";
import * as actions from "../actions/retrieveApplicantInfo";
import { setConfig, loadMetaData } from "../actions/appConfig";
import { retrieveApplicantInfos, prospect as prospectApi } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader } from "../selectors/appConfig";
import { updateStakeholdersIds } from "../actions/stakeholders";

function* retrieveApplicantInfoSaga({ payload }) {
  try {
    const inputParam = {
      applicantName: payload.fullName || "",
      countryCode: payload.countryCode || "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };

    const response = yield call(retrieveApplicantInfos.applicant, inputParam);
    yield put(actions.retrieveApplicantInfoSuccess(response.data));
  } catch (error) {
    log(error);
  }
}

function* getProspectIdInfo({ payload }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    const response = yield call(prospectApi.get, payload.prospectId, headers);
    const { freeFieldsInfo, ...prospect } = response.data;
    const config = { prospect };

    yield put(setConfig(config));
    yield put(loadMetaData(freeFieldsInfo));

    const stakeholdersIds = config.prospect.signatoryInfo.map(() => ({
      id: uniqueId(),
      done: false,
      isEditting: false
    }));

    yield put(updateStakeholdersIds(stakeholdersIds));
    yield put(actions.getProspectInfoSuccess(config));
  } catch (error) {
    log(error);
    yield put(actions.getProspectInfoFail());
  }
}

export default function* retrieveApplicantSaga() {
  yield all([takeLatest(actions.RETRIEVE_APPLICANT_INFO, retrieveApplicantInfoSaga)]);
  yield all([takeLatest(actions.GET_PROSPECT_INFO_REQUEST, getProspectIdInfo)]);
}
