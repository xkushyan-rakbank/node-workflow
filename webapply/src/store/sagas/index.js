import { all, fork } from "redux-saga/effects";
import appConfigSaga from "./appConfig";

export default function*() {
  yield all([fork(appConfigSaga)]);
}
