import { all, call, put, select, takeLatest, delay } from "redux-saga/effects";
import get from "lodash/get";
import { otp } from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import * as serverValidationActions from "../actions/serverValidation";
import * as comeBackLoginActions from "../actions/comeBackLogin";
import { prospect as initialProspect } from "./../../constants/config";
import { updateProspect } from "../actions/appConfig";

function* generateOtp(action) {
  try {
    const prospectUpdated = { ...initialProspect, applicantInfo: action.payload };

    yield put(updateProspect({ prospect: prospectUpdated }));

    const state = yield select();
    action.payload["prospectId"] = appConfigSelectors.getApplicantInfo(state);

    const { data } = yield call(otp.generate, action.payload);
    yield put(comeBackLoginActions.generateCodeSuccess(data));
  } catch (error) {
    yield put(comeBackLoginActions.setOtpPendingRequest(false));
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
      yield put(comeBackLoginActions.verifyCodeSuccess());
    } else {
      yield put(comeBackLoginActions.verifyCodeFailed());
    }
  } catch (error) {
    yield put(comeBackLoginActions.setOtpPendingRequest(false));
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
    takeLatest(comeBackLoginActions.GENERATE_OTP_CODE, generateOtp),
    takeLatest(comeBackLoginActions.VERIFY_OTP, verifyOtp)
  ]);
}
