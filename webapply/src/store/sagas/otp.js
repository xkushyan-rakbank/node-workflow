import { all, call, put, select, takeLatest } from "redux-saga/effects";
import get from "lodash/get";
import { otp } from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import * as serverValidationActions from "../actions/serverValidation";
import * as otpActions from "../actions/otp";
import { log } from "../../utils/loggger";

function* generateOtp(action) {
  try {
    const { data } = yield call(otp.generate, action.payload);

    yield put(otpActions.generateCodeSuccess(data));
  } catch (error) {
    yield put(otpActions.setOtpPendingRequest(false));
    if (error.isAxiosError) {
      const errors = get(error, "response.data.errors", []);
      yield put(serverValidationActions.setInputsErrors(errors));
    } else {
      log(error);
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
      log(error);
    }
  }
}

export default function* otpSagas() {
  yield all([
    takeLatest(otpActions.GENERATE_OTP_CODE, generateOtp),
    takeLatest(otpActions.VERIFY_OTP, verifyOtp)
  ]);
}
