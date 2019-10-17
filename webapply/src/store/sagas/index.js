import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";
import applicantInfoSaga from "./applicantInfoForm";
import sendProspectToAPI from "./sendProspectToAPI";
import otpSaga from "./otp";
import loginForm from "./loginForm";
import retrieveUploadDoc from "./getProspectDocuments";
import searchProspectSaga from "./searchProspect";
import retrieveApplicantInfo from "./retrieveApplicantInfo";
import stakeholders from "./stakeholders";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(reCaptchaSaga),
    fork(otpSaga),
    fork(applicantInfoSaga),
    fork(sendProspectToAPI),
    fork(loginForm),
    fork(retrieveUploadDoc),
    fork(searchProspectSaga),
    fork(retrieveApplicantInfo),
    fork(stakeholders)
  ]);
}
