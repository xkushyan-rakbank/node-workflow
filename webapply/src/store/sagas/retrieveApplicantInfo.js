import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/retrieveApplicantInfo";
import { displayScreenBasedOnViewId, setProspect } from "../actions/appConfig";
import apiClient from "../../api/apiClient";

function* retrieveApplicantInfoSaga(action) {
  try {
    const inputParam = {
      fullName: action.payload.fullName || "",
      countryCode: action.payload.countryCode || "",
      mobileNo: action.payload.mobileNo || "",
      email: action.payload.email || ""
    };
    const response = yield call(apiClient.retrieveApplicantInfos.applicant, inputParam);
    yield put(actions.retrieveApplicantInfoSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

function* getProspectIdInfo(action) {
  try {
    const prospectId = action.payload;
    console.log(action.payload);
    const response = yield call(apiClient.prospect.get, prospectId);
    yield put(setProspect(response.data));
    yield put(displayScreenBasedOnViewId());
  } catch (error) {
    console.log(error);
  }
}

export default function* retrieveApplicantSaga() {
  yield all([takeLatest(actions.RETRIEVE_APPLICANT_INFO, retrieveApplicantInfoSaga)]);
  yield all([takeLatest(actions.GET_PROSPECT_INFO, getProspectIdInfo)]);
}
