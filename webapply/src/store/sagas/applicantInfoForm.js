import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  APPLICANT_INFO_FORM,
  RESET_APPLICANT_INFO,
  applicantInfoFormFail,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import {
  updateProspectId,
  updateProspect,
  updateSaveType,
  updateActionType
} from "../actions/appConfig";
import { resetInputsErrors } from "./../actions/serverValidation";
import { generateCodeSuccess } from "../actions/otp";
import { prospect } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import { getAuthorizationHeader, getIsRecaptchaEnable } from "./../selectors/appConfig";
import { NEXT, SAVE } from "../../constants";

function* applicantInfoFormSaga({ payload }) {
  try {
    const state = yield select();

    let prospectUpdated = {
      ...state.appConfig.prospect,
      applicantInfo: payload
    };
    yield put(updateProspect({ prospect: prospectUpdated }));
    if (getIsRecaptchaEnable(state)) {
      prospectUpdated = {
        ...prospectUpdated,
        recaptchaToken: state.reCaptcha.token
      };
    }

    const headers = getAuthorizationHeader(state);

    const {
      data: { prospectId }
    } = yield call(prospect.create, prospectUpdated, headers);

    yield put(generateCodeSuccess());
    yield put(updateProspectId(prospectId));
    yield put(updateActionType(SAVE));
    yield put(updateSaveType(NEXT));
    yield put(resetInputsErrors());
    yield put(applicantInfoFormSuccess());
  } catch (error) {
    yield put(applicantInfoFormFail(error));
    log(error);
  }
}

function* resetApplicantInfoSaga({ payload }) {
  try {
    const state = yield select();

    let prospectUpdated = {
      ...state.appConfig.prospect,
      applicantInfo: {
        fullName: "",
        email: "",
        countryCode: "971",
        mobileNo: "",
        applyOnbehalf: false
      }
    };
    yield put(updateProspect({ prospect: prospectUpdated }));
  } catch (error) {
    log(error);
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
  yield all([takeLatest(RESET_APPLICANT_INFO, resetApplicantInfoSaga)]);
}
