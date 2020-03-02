import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  SEARCH_APPLICATIONS_REQUEST,
  searchApplicationsSuccess,
  searchApplicationsFailure
} from "../actions/searchProspect";
import { search } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader } from "../selectors/appConfig";

function* searchProspectFormSaga({ payload }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    const {
      fullName: applicantName = "",
      countryCode = "",
      mobileNo = "",
      leadNumber = "",
      tradeLicenseNo = "",
      email = ""
    } = payload;

    const inputParam = {
      applicantName,
      countryCode,
      mobileNo,
      leadNumber,
      tradeLicenseNo,
      email,
      eidNumber: ""
    };
    const response = yield call(search.searchApplication, inputParam, headers);
    yield put(searchApplicationsSuccess(response.data.searchResult));
  } catch (error) {
    yield put(searchApplicationsFailure());
    log(error);
  }
}

export default function* searchProspectSaga() {
  yield all([takeLatest(SEARCH_APPLICATIONS_REQUEST, searchProspectFormSaga)]);
}
