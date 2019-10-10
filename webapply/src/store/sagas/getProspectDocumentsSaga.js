import { all, call, put, takeLatest } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import * as actions from "../actions/getProspectDocumentsActions";

function* getProspectDocuments() {
  try {
    const response = yield call(apiClient.getProspectDocuments.retriveDocuments);
    if (response.status === 200) {
      yield put(actions.retrieveDocDetailssSuccess(response.data));
    } else {
      yield put(actions.retrieveDocDetailssError());
    }
  } catch (error) {
    yield put(actions.retrieveDocDetailssError(error));
  }
}

export default function* appConfigSaga() {
  yield all([takeLatest(actions.RETRIEVE_DOC_UPLOADER, getProspectDocuments)]);
}
