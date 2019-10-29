import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { APPLICANT_INFO_FORM, applicantInfoFormSuccess } from "../actions/applicantInfoForm";
import { history } from "./../configureStore";
import cloneDeep from "lodash/cloneDeep";
import { updateProspectId, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { setVerified } from "../actions/reCaptcha";

import apiClient from "../../api/apiClient";

import routes from "./../../routes";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const config = cloneDeep(state.appConfig);
    const token = state.reCaptcha.token;

    config.prospect["recaptchaToken"] = token;

    const {
      data: { prospectId }
    } = yield call(apiClient.prospect.create, config.prospect);

    yield put(applicantInfoFormSuccess());
    yield put(setVerified(true));

    yield put(updateProspectId(prospectId));
    yield put(updateSaveType("next"));

    yield call(history.push, routes.verifyOtp);
    yield put(resetInputsErrors());
  } catch (error) {
    console.error(error);
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
