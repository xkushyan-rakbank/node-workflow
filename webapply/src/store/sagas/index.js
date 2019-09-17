import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";
import reCaptchaSaga from "./reCaptcha";

export default function*() {
  yield all([fork(appConfigSaga), fork(reCaptchaSaga)]);
}
