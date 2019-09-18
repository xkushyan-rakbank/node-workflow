import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";
import applicantInfoSaga from "./applicantInfoForm";

export default function*() {
  yield all([
    fork(appConfigSaga),
    fork(reCaptchaSaga),
    fork(applicantInfoSaga)
  ]);
}
