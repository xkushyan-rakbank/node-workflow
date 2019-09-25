import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";
import applicantInfoSaga from "./applicantInfoForm";
import aboutCompanySaga from "./aboutCompany";
import otpSaga from "./otp";
import uploadDoc from "./uploadDoc";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(reCaptchaSaga),
    fork(otpSaga),
    fork(applicantInfoSaga),
    fork(uploadDoc),
    fork(applicantInfoSaga),
    fork(aboutCompanySaga)
  ]);
}
