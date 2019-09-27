import { all, call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import * as actions from "../actions/uploadDocActions";

function* UploadDoc() {
  try {
    const response = yield call(apiClient.uploadDocuments.uploadDocument);
    yield put(actions.docUploadSuccess(response.data));
  } catch (error) {
    yield put(actions.docUploadError(error));
  }
}

export default function* appConfigSaga() {
  yield all([takeLatest(actions.DOC_UPLOADER, UploadDoc)]);
}
