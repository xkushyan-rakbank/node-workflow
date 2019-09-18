import {
  all,
  call,
  put,
  takeLatest,
  takeEvery,
  select
} from "redux-saga/effects";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess,
  applicantInfoFormFail
} from "../actions/applicantInfoForm";
import { setInputsErrors } from "./../actions/serverValidation";
import { applicantInfoFormSubmit } from "../../api/applicantInfo";

function* applicantInfoFormSaga(data) {
  try {
    const response = yield call(applicantInfoFormSubmit);
    yield put(applicantInfoFormSuccess());
  } catch (error) {
    console.error(error);
    // yield put(setInputsErrors(error));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
