import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { otp } from "../../api/apiClient";
import { getApplicantInfo, getProspectId, getAuthorizationHeader } from "../selectors/appConfig";
import * as otpActions from "../actions/otp";
import { log } from "../../utils/loggger";

function* generateOtp(action) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    yield call(otp.generate, action.payload, headers);

    yield put(otpActions.generateCodeSuccess());
  } catch (error) {
    log(error);
  } finally {
    yield put(otpActions.setGeneratingCode(false));
  }
}

function* verifyOtp({ payload: otpToken }) {
  try {
    const state = yield select();
    const headers = getAuthorizationHeader(state);
    const applicantInfo = getApplicantInfo(state);

    const payload = {
      email: applicantInfo.email,
      prospectId: getProspectId(state),
      mobileNo: applicantInfo.mobileNo,
      countryCode: applicantInfo.countryCode,
      otpToken
    };
    const { data } = yield call(otp.verify, payload, headers);
    if (data.verified) {
      yield put(otpActions.verifyCodeSuccess());
    } else {
      yield put(otpActions.verifyCodeFailed());
    }
  } catch (error) {
    log(error);
  } finally {
    yield put(otpActions.setOtpPendingRequest(false));
  }
}

export default function* otpSagas() {
  yield all([
    takeLatest(otpActions.GENERATE_OTP_CODE, generateOtp),
    takeLatest(otpActions.VERIFY_OTP, verifyOtp)
  ]);
}
