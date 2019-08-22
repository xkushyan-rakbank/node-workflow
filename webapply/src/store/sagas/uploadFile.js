import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  UPLOAD_FILE,
  uploadFileSuccess,
  uploadFileFail
} from "../actions/uploadFile";
import { uploadFileRequest } from "../../api/uploadFile";

function* uploadFileSaga(data) {
  try {
    yield call(uploadFileRequest, data);
    yield put(uploadFileSuccess());
  } catch (error) {
    yield put(uploadFileFail(error));
  }
}

export default function* uploadFile() {
  yield all([takeLatest(UPLOAD_FILE, uploadFileSaga)]);
}
