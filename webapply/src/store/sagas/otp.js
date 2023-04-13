import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { otp } from "../../api/apiClient";
import { getApplicantInfo, getProspectId, getAuthorizationHeader } from "../selectors/appConfig";
import {
  setGeneratingCode,
  generateCodeSuccess,
  verifyCodeSuccess,
  verifyCodeFailed,
  setOtpPendingRequest,
  GENERATE_OTP_CODE,
  VERIFY_OTP
} from "../actions/otp";
import { log } from "../../utils/loggger";

export function* generateOtp(action) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const prospectId = yield select(getProspectId);

    yield call(otp.generate, { ...action.payload, prospectId }, headers);
    yield put(generateCodeSuccess());
  } catch (error) {
    log(error);
  } finally {
    yield put(setGeneratingCode(false));
  }
}

export function* verifyOtp({ payload: { code, mode } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const applicantInfo = yield select(getApplicantInfo);
    const prospectId = yield select(getProspectId);

    const payload = {
      email: applicantInfo.email,
      prospectId,
      mobileNo: applicantInfo.mobileNo,
      countryCode: applicantInfo.countryCode,
      otpToken: code,
      mode
    };
    const { data } = yield call(otp.verify, payload, headers);
    if (data.verified) {
      yield put(verifyCodeSuccess());
    } else {
      yield put(verifyCodeFailed());
    }
  } catch (error) {
    log(error);
  } finally {
    yield put(setOtpPendingRequest(false));
  }
}

export default function* otpSagas() {
  yield all([takeLatest(GENERATE_OTP_CODE, generateOtp), takeLatest(VERIFY_OTP, verifyOtp)]);
}
