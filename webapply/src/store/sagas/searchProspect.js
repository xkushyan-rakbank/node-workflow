import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  SEARCH_APPLICATIONS,
  FORMAT_SEARCH_LIST,
  searchApplicationsSuccess
} from "../actions/searchProspect";
import apiClient from "../../api/apiClient";
import { updateProspect } from "../actions/appConfig";

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
    console.error({ error });
  }
}

function* formatSearchListSaga() {
  const clearedSearchDetail = {
    "searchInfo.fname": "",
    "searchInfo.countryCode": "",
    "searchInfo.mobileNo": "",
    "searchInfo.leadNumber": "",
    "searchInfo.tradeLicenseNo": "",
    "searchInfo.email": ""
  };
  yield put(updateProspect(clearedSearchDetail));
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS, searchProspectFormSaga)]);
  yield all([takeLatest(FORMAT_SEARCH_LIST, formatSearchListSaga)]);
}
