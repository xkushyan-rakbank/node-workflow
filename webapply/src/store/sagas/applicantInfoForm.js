import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { history } from "./../configureStore";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import * as appConfigActions from "../actions/appConfig";
import { setInputsErrors } from "./../actions/serverValidation";
import apiClient from "../../api/apiClient";
import routes from "./../../routes";
import * as appConfigSelectors from "../selectors/appConfig";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const { data: prospect } = yield call(
      apiClient.prospect.create,
      appConfigSelectors.getProspect(state)
    );
    yield put(applicantInfoFormSuccess());
    yield put(appConfigActions.updateProspect(prospect));
    yield call(history.push, routes.verifyOtp);
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
