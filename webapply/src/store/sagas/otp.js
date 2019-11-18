import { all, call, put, select, takeLatest, delay } from "redux-saga/effects";
import get from "lodash/get";
import { otp } from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import * as serverValidationActions from "../actions/serverValidation";
import * as otpActions from "../actions/otp";

function* generateOtp() {
  try {
    const state = yield select();
    const applicantInfo = appConfigSelectors.getApplicantInfo(state);
    const payload = {
      prospectId: appConfigSelectors.getProspectId(state),
      mobileNo: applicantInfo.mobileNo,
      countryCode: applicantInfo.countryCode,
      email: applicantInfo.email
    };

    if (state.reCaptcha.token) {
      payload.recaptchaToken = state.reCaptcha.token;
    }

    const { data } = yield call(otp.generate, payload);
    yield put(otpActions.generateCodeSuccess(data));
  } catch (error) {
    yield put(otpActions.setOtpPendingRequest(false));
    if (error.isAxiosError) {
      const errors = get(error, "response.data.errors", []);
      yield put(serverValidationActions.setInputsErrors(errors));
    } else {
      yield call(otpSystemErrorHandler, error);
    }
  }
}

function* verifyOtp({ payload: otpToken }) {
  try {
    const state = yield select();
    const applicantInfo = appConfigSelectors.getApplicantInfo(state);

    const payload = {
      prospectId: appConfigSelectors.getProspectId(state),
      mobileNo: applicantInfo.mobileNo,
      countryCode: applicantInfo.countryCode,
      otpToken
    };
    const { data } = yield call(otp.verify, payload);
    // TODO: only for develop - remove
    yield delay(Math.random() > 0.5 ? 2000 : 1000);
    if (data.verified) {
      yield put(otpActions.verifyCodeSuccess());
    } else {
      yield put(otpActions.verifyCodeFailed());
    }
  } catch (error) {
    yield put(otpActions.setOtpPendingRequest(false));
    if (error.isAxiosError) {
      const errors = get(error, "response.data.errors", []);
      yield put(serverValidationActions.setInputsErrors(errors));
    } else {
      yield call(otpSystemErrorHandler, error);
    }
  }
}

function otpSystemErrorHandler(error) {
  console.log("OTP_SAGA_CALL_SYSTEM_ERROR");
  console.error(error);
}

export default function* otpSagas() {
  yield all([
    takeLatest(otpActions.GENERATE_OTP_CODE, generateOtp),
    takeLatest(otpActions.VERIFY_OTP, verifyOtp)
  ]);
}
