import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { APPLICANT_INFO_FORM, applicantInfoFormSuccess } from "../actions/applicantInfoForm";

import cloneDeep from "lodash/cloneDeep";
import { updateProspectId, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { generateOtpCode } from "./../actions/otp";
import { setVerified } from "../actions/reCaptcha";

import apiClient from "../../api/apiClient";

function* applicantInfoFormSaga() {
  try {
    const state = yield select();
    const config = cloneDeep(state.appConfig);

    const {
      data: { prospectId }
    } = yield call(apiClient.prospect.create, config.prospect);

    yield put(applicantInfoFormSuccess());
    yield put(setVerified(true));

    yield put(updateProspectId(prospectId));
    yield put(generateOtpCode());
    yield put(updateSaveType("next"));
    yield put(resetInputsErrors());
  } catch (error) {
    console.error(error);
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
