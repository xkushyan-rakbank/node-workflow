import { all, call, put, select, takeLatest } from "redux-saga/effects";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import * as appConfigActions from "../actions/appConfig";
import { setInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const { data } = yield call(
      apiClient.prospect.create,
      appConfigSelectors.getProspect(state)
    );
    yield put(applicantInfoFormSuccess());
    // temp implementation - work with WireMock data
    yield put(appConfigActions.updateProspectId(data.prospectId));
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
