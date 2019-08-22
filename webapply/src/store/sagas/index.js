import { all, fork } from "redux-saga/effects";
import uploadFile from "./uploadFile";

export default function*() {
  yield all([fork(uploadFile)]);
}
