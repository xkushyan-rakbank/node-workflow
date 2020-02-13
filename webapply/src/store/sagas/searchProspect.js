import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { SEARCH_APPLICATIONS, searchApplicationsSuccess } from "../actions/searchProspect";
import { search } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader } from "../selectors/appConfig";

function* searchProspectFormSaga({ payload }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    const inputParam = {
      applicantName: payload.fname || "",
      countryCode: payload.countryCode || "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };
    const response = yield call(search.searchApplication, inputParam, headers);
    yield put(searchApplicationsSuccess(response.data));
  } catch (error) {
    log(error);
  }
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS, searchProspectFormSaga)]);
}
