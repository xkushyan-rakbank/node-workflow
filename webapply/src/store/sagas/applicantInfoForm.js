import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "./../configureStore";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import { setInputsErrors } from "./../actions/serverValidation";
import { applicantInfoFormSubmit } from "../../api/applicantInfo";
import routes from "./../../routes";

function* applicantInfoFormSaga({ data }) {
  try {
    const response = yield call(applicantInfoFormSubmit, data);
    yield put(applicantInfoFormSuccess());
    yield call(history.push, routes.verifyOtp);
  } catch (error) {
    const { errors } = error.response.data;
    yield put(setInputsErrors(errors));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
