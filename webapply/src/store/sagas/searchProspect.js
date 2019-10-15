import { all, call, put, takeLatest } from "redux-saga/effects";
import { SEARCH_APPLICATIONS, searchApplicationsSuccess } from "../actions/searchProspect";
import apiClient from "../../api/apiClient";

function* searchProspectFormSaga(action) {
  try {
    const inputParam = {
      fullName: action.payload.fname || "",
      countryCode: action.payload.countryCode || "",
      mobileNo: action.payload.mobileNo || "",
      leadNumber: action.payload.leadNumber || "",
      tradeLicenseNo: action.payload.tradeLicenseNo || "",
      email: action.payload.email || "",
      eidNumber: ""
    };
    const response = yield call(apiClient.search.searchApplication, inputParam);
    yield put(searchApplicationsSuccess(response.data));
  } catch (error) {
    console.log({ error });
  }
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS, searchProspectFormSaga)]);
}
