import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { SEARCH_APPLICATIONS, searchApplicationsSuccess } from "../actions/searchProspect";
import { setInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";

function* searchProspectFormSaga(action) {
  try {
    console.log("search inputs", action);
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
    const response = yield call(apiClient.search.seaerchApplication, apiUrl, inputParam);
    yield put(searchApplicationsSuccess(response.data));
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS, searchProspectFormSaga)]);
}
