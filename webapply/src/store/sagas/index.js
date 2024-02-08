import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";

import applicantInfoSaga from "./applicantInfoForm";
import sendProspectToAPISagas from "./sendProspectToAPI";
import otpSaga from "./otp";
import loginForm from "./loginForm";
import retrieveUploadDoc from "./uploadDocuments";
import searchProspectSaga from "./searchProspect";
import retrieveApplicantInfo from "./retrieveApplicantInfo";
import stakeholders from "./stakeholders";
import screenProspect from "./screenProspect";
import agentFeatures from "./agentFeatures";
import decisionsSaga from "./decisions";
import kycSaga from "./kyc";
import sdkConfigSaga from "./sdkConfig";
import webToMobileSaga from "./webToMobile";
import termsAndConditionsSaga from "./termsAndConditions";
import additionalInfoSaga from "./additionalInfo";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(otpSaga),
    fork(applicantInfoSaga),
    fork(sendProspectToAPISagas),
    fork(loginForm),
    fork(retrieveUploadDoc),
    fork(searchProspectSaga),
    fork(retrieveApplicantInfo),
    fork(stakeholders),
    fork(screenProspect),
    fork(agentFeatures),
    fork(decisionsSaga),
    fork(kycSaga),
    fork(sdkConfigSaga),
    fork(webToMobileSaga),
    fork(termsAndConditionsSaga),
    fork(additionalInfoSaga)
  ]);
}
