import { all, call, put, takeLatest } from "redux-saga/effects";
import { APPLICANT_INFO_FORM, applicantInfoFormSuccess } from "../actions/applicantInfoForm";
import { updateProspectId, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { generateOtpCode } from "./../actions/otp";
import { setVerified } from "../actions/reCaptcha";

import { prospect } from "../../api/apiClient";

function* applicantInfoFormSaga(action) {
  try {
    const {
      data: { prospectId }
    } = yield call(prospect.create, action.data);

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
