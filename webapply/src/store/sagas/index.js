import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";
import applicantInfoSaga from "./applicantInfoForm";
import uploadDoc from "./uploadDoc";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(reCaptchaSaga),
    fork(applicantInfoSaga),
    fork(uploadDoc)
  ]);
}
