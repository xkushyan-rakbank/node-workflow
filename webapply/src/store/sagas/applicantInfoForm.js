import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { history } from "./..";
import { APPLICANT_INFO_FORM } from "../actions/applicantInfoForm";
import { updateProspectId, updateProspect, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { setVerified } from "../actions/reCaptcha";
import { prospect } from "../../api/apiClient";
import routes from "./../../routes";
import { log } from "../../utils/loggger";
import { IS_RECAPTCHA_ENABLE } from "../../constants";
import { generateCodeSuccess } from "../actions/otp";

function* applicantInfoFormSaga(action) {
  try {
    const state = yield select();

    let prospectUpdated = {
      ...state.appConfig.prospect,
      applicantInfo: action.data
    };

    yield put(updateProspect({ prospect: prospectUpdated }));

    if (IS_RECAPTCHA_ENABLE) {
      const state = yield select();
      const recaptchaToken = state.reCaptcha.token;
      prospectUpdated = { ...prospectUpdated, recaptchaToken };
    }

    const {
      data: { prospectId }
    } = yield call(prospect.create, prospectUpdated);

    yield put(setVerified(true));
    yield put(generateCodeSuccess());
    yield put(updateProspectId(prospectId));
    yield call(history.push, routes.verifyOtp);
    yield put(updateSaveType("next"));
    yield put(resetInputsErrors());
  } catch (error) {
    log(error);
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
