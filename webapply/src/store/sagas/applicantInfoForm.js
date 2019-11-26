import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { history } from "./..";
import { APPLICANT_INFO_FORM } from "../actions/applicantInfoForm";
import { updateProspectId, updateProspect, updateSaveType } from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { setVerified } from "../actions/reCaptcha";
import { prospect } from "../../api/apiClient";
import { prospect as initialProspect } from "./../../constants/config";
import routes from "./../../routes";
import { log } from "../../utils/loggger";
import { IS_RECAPTCHA_ENABLE } from "../../constants";

function* applicantInfoFormSaga(action) {
  try {
    let prospectUpdated = {
      ...initialProspect,
      applicantInfo: action.data
    };

    if (IS_RECAPTCHA_ENABLE) {
      const state = yield select();
      const recaptchaToken = state.reCaptcha.token;
      prospectUpdated = { ...prospectUpdated, recaptchaToken };
    }

    yield put(updateProspect({ prospect: prospectUpdated }));

    const {
      data: { prospectId }
    } = yield call(prospect.create, prospectUpdated);

    yield put(setVerified(true));

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
