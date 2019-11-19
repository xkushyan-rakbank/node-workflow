import { all, call, put, takeLatest } from "redux-saga/effects";
import { history } from "./..";
import { APPLICANT_INFO_FORM, applicantInfoFormSuccess } from "../actions/applicantInfoForm";
import { updateProspectId, updateProspect, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { generateOtpCode } from "./../actions/otp";
import { setVerified } from "../actions/reCaptcha";
import { prospect } from "../../api/apiClient";
import { prospect as initialProspect } from "./../../constants/config";
import routes from "./../../routes";

function* applicantInfoFormSaga(action) {
  try {
    const prospectUpdated = { ...initialProspect, applicantInfo: action.data };

    yield put(updateProspect({ prospect: prospectUpdated }));

    const {
      data: { prospectId }
    } = yield call(prospect.create, prospectUpdated);

    yield put(applicantInfoFormSuccess());
    yield put(setVerified(true));

    yield put(updateProspectId(prospectId));
    yield put(generateOtpCode());
    yield call(history.push, routes.verifyOtp);
    yield put(updateSaveType("next"));
    yield put(resetInputsErrors());
  } catch (error) {
    console.error(error);
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
