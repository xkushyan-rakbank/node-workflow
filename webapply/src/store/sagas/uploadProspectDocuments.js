import { all, call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import * as actions from "../actions/uploadProspectDocument";

function* uploadProspectDocuments(data) {
  try {
    const response = yield call(apiClient.uploadProspectDocuments.uploadDocuments, data);
    if (response.status === 200) {
      yield put(actions.docUploadDetailsSuccess(response.data));
    } else {
      yield put(actions.docUploadDetailsError());
    }
  } catch (error) {
    yield put(actions.docUploadDetailsError(error));
  }
}

export default function* appConfigSaga() {
  yield all([takeLatest(actions.DOC_UPLOADER, uploadProspectDocuments)]);
}
