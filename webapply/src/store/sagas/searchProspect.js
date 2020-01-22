import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  SEARCH_APPLICATIONS,
  FORMAT_SEARCH_LIST,
  searchApplicationsSuccess
} from "../actions/searchProspect";
import { search } from "../../api/apiClient";
import { updateProspect } from "../actions/appConfig";
import { log } from "../../utils/loggger";
import { getAuthToken } from "../selectors/appConfig";

function* searchProspectFormSaga({ payload }) {
  try {
    const state = yield select();
    const authToken = getAuthToken(state);
    const inputParam = {
      applicantName: payload.fname || "",
      countryCode: payload.countryCode || "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };
    const response = yield call(search.searchApplication, inputParam, authToken);
    yield put(searchApplicationsSuccess(response.data));
  } catch (error) {
    log(error);
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
