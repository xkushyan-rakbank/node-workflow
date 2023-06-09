import { all, call, put, takeLatest, select } from "redux-saga/effects";
import {
  APPLICANT_INFO_FORM,
  applicantInfoFormFail,
  applicantInfoFormSuccess
} from "../actions/applicantInfoForm";
import {
  updateProspectId,
  updateProspect,
  updateValidRoCode,
  updateRoEmail
} from "../actions/appConfig";
import { resetInputsErrors, setInputsErrors } from "./../actions/serverValidation";
import { generateCodeSuccess } from "../actions/otp";
import { otp, prospect as prospectApi } from "../../api/apiClient";
import { log } from "../../utils/loggger";
import {
  getApplicationInfo,
  getAuthorizationHeader,
  getIsRecaptchaEnable
} from "./../selectors/appConfig";
import { FieldsValidationError } from "../../api/serverErrors";
import { NEXT, SAVE, UAE_CODE } from "../../constants";
import { getProspect } from "../selectors/appConfig";
import { getReCaptchaToken } from "../selectors/reCaptcha";
import { getLeadSource } from "../selectors/appConfig";

export function* applicantInfoFormSaga({ payload }) {
  try {
    const isRecaptchaEnable = yield select(getIsRecaptchaEnable);
    const prospect = yield select(getProspect);
    const applicationInfo = yield select(getApplicationInfo);
    const headers = yield select(getAuthorizationHeader);
    const leadSource = yield select(getLeadSource);

    payload.LeadSource = leadSource;

    const prospectUpdated = {
      ...prospect,
      applicantInfo: payload,
      applicationInfo: {
        ...applicationInfo,
        saveType: NEXT,
        actionType: SAVE
      }
    };

    yield put(updateProspect({ prospect: prospectUpdated }));

    const sendingData = { ...prospectUpdated };

    if (isRecaptchaEnable) {
      sendingData.recaptchaToken = yield select(getReCaptchaToken);
    }

    const {
      data: { prospectId, validRoCode, roEmail }
    } = yield call(prospectApi.create, sendingData, headers);

    if (prospectId) {
      const otpGenerationPayload = {
        email: payload.email,
        countryCode: payload.countryCode,
        mobileNo: payload.mobileNo,
        action: "generate",
        mode: payload.countryCode === UAE_CODE ? "sms" : "email",
        prospectId
      };
      yield call(otp.generate, { ...otpGenerationPayload }, headers);
      yield put(generateCodeSuccess());
      yield put(updateRoEmail(roEmail));
    }

    yield put(updateProspectId(prospectId));
    yield put(
      updateValidRoCode(
        typeof validRoCode !== "undefined" && validRoCode !== null ? validRoCode : "N"
      )
    );
    yield put(resetInputsErrors());
    yield put(applicantInfoFormSuccess());
  } catch (error) {
    if (error instanceof FieldsValidationError) {
      yield put(setInputsErrors(error.getInputsErrors()));
    } else {
      log(error);
    }
    yield put(applicantInfoFormFail(error));
  }
}

export default function* applicantInfoSaga() {
  yield all([takeLatest(APPLICANT_INFO_FORM, applicantInfoFormSaga)]);
}
