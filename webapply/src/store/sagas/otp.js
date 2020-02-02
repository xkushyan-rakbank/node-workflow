import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { otp } from "../../api/apiClient";
import { getApplicantInfo, getProspectId, getAuthorizationHeader } from "../selectors/appConfig";
import * as otpActions from "../actions/otp";
import { sendGoogleAnalyticsMetrics } from "../actions/googleAnalytics";
import { log } from "../../utils/loggger";
import { GA_EVENTS } from "../../utils/ga";
import routes from "../../routes";

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
      if (state.router.location.pathname.includes(routes.comeBackLoginVerification)) {
        sendGoogleAnalyticsMetrics(GA_EVENTS.COMEBACK_OTP_SUBMITTED);
      }
      sendGoogleAnalyticsMetrics(GA_EVENTS.PRODUCT_OTP_SUBMITTED);
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
