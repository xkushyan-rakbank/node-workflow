import { all, call, put, select, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/retrieveApplicantInfo";
import { displayScreenBasedOnViewId, setConfig } from "../actions/appConfig";
import { retrieveApplicantInfos, prospect } from "../../api/apiClient";
import { log } from "../../utils/loggger";

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
    const response = yield call(prospect.get, payload);
    const config = { prospect: response.data };
    const state = yield select();
    const agentId = state.login.loginResponse.agentId;
    const isAppSubmitted = true;
    const isUserEditingAppNow = false;
    const isAnotherAgentEditingAppNow = false;
    if (
      (isAppSubmitted && (!agentId || isAnotherAgentEditingAppNow)) ||
      (!isAppSubmitted && (isAnotherAgentEditingAppNow || isUserEditingAppNow))
    ) {
      return;
    }
    yield put(setConfig(config));
    yield put(displayScreenBasedOnViewId());
  } catch (error) {
    log(error);
  }
}

export default function* retrieveApplicantSaga() {
  yield all([takeLatest(actions.RETRIEVE_APPLICANT_INFO, retrieveApplicantInfoSaga)]);
  yield all([takeLatest(actions.GET_PROSPECT_INFO, getProspectIdInfo)]);
}
