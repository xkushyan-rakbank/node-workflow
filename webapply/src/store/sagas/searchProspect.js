import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  SEARCH_APPLICATIONS_REQUEST,
  searchApplicationsSuccess,
  searchApplicationsFailure,
  getProspectOverviewSuccess,
  getProspectOverviewFail,
  GET_PROSPECT_OVERVIEW_REQUEST
} from "../actions/searchProspect";
import { search } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader } from "../selectors/appConfig";
import { prospect as prospectApi } from "../../api/apiClient";

function* searchProspectFormSaga({ payload }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);

    const inputParam = {
      applicantName: payload.fullName || "",
      countryCode: payload.mobileNo ? payload.countryCode : "",
      mobileNo: payload.mobileNo || "",
      leadNumber: payload.leadNumber || "",
      tradeLicenseNo: payload.tradeLicenseNo || "",
      email: payload.email || "",
      eidNumber: ""
    };

    const response = yield call(search.searchApplication, inputParam, headers);
    yield put(searchApplicationsSuccess(response.data.searchResult));
  } catch (error) {
    yield put(searchApplicationsFailure());
    log(error);
  }
}

function* getProspectOverviewSaga({ payload: { prospectId } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const response = yield call(prospectApi.get, prospectId, headers);
    const prospect = response.data;

    yield put(getProspectOverviewSuccess(prospect));
  } catch (error) {
    log(error);
    yield put(getProspectOverviewFail());
  }
}

export default function* searchProspectSaga() {
  yield all([
    takeLatest(SEARCH_APPLICATIONS_REQUEST, searchProspectFormSaga),
    takeLatest(GET_PROSPECT_OVERVIEW_REQUEST, getProspectOverviewSaga)
  ]);
}
