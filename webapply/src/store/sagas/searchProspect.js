import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { SEARCH_APPLICATIONS, searchApplicationsSuccess } from "../actions/searchProspect";
import apiClient from "../../api/apiClient";

function* searchProspectFormSaga(action) {
  try {
    const state = yield select();
    const inputParam = {
      fname: action.payload.fname || "",
      countryCode: action.payload.countryCode || "",
      mobileNo: action.payload.mobileNo || "",
      leadNumber: action.payload.leadNumber || "",
      tradeLicenseNo: action.payload.tradeLicenseNo || "",
      email: action.payload.email || "",
      eidNumber: ""
    };
    const apiUrl = state.appConfig.appConfig.endpoints.searchProspectPath.replace(
      "{userType}",
      "sme"
    );
    const response = yield call(apiClient.search.searchApplication, apiUrl, inputParam);
    yield put(searchApplicationsSuccess(response.data));
  } catch (error) {
    console.log({ error });
  }
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS, searchProspectFormSaga)]);
}
