import { all, call, put, select, takeLatest } from "redux-saga/effects";
import get from "lodash/get";
import apiClient from "../../api/apiClient";
import * as appConfigSelectors from "../selectors/appConfig";
import * as serverValidationActions from "../actions/serverValidation";
import * as otpActions from "../actions/otp";

function* generateOtp() {
  try {
    const state = yield select();
    const applicantInfo = appConfigSelectors.getApplicantInfo(state);
    const payload = {
      prospectId: appConfigSelectors.getProspectId(state),
      email: applicantInfo.email,
      mobileNo: applicantInfo.mobileNo,
      countryCode: applicantInfo.countryCode
    };
    yield call(apiClient.otp.generate, payload);
  } catch (error) {
    if (error.isAxiosError) {
      const errors = get(error, "response.data.errors", []);
      yield put(serverValidationActions.setInputsErrors(errors));
    } else {
      //TODO: PROGRAM ERROR HANDLER
    }
  }
}

export default function* otpSagas() {
  yield all[takeLatest(otpActions.GENERATE_OTP_CODE, generateOtp)];
}
