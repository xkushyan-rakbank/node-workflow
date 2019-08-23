import { all, fork } from "redux-saga/effects";
import uiConfigSaga from "./uiConfig";

export default function*() {
  yield all([fork(uiConfigSaga)]);
}
