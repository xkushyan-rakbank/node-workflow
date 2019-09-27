import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";
import applicantInfoSaga from "./applicantInfoForm";
import aboutCompanySaga from "./aboutCompany";
import otpSaga from "./otp";
import loginForm from "./loginForm";
import uploadDoc from "./uploadDoc";
import searchProspectSaga from "./searchProspect";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(reCaptchaSaga),
    fork(otpSaga),
    fork(applicantInfoSaga),
    fork(aboutCompanySaga),
    fork(loginForm),
    fork(uploadDoc),
    fork(searchProspectSaga)
  ]);
}
