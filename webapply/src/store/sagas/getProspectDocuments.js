import { all, call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";

function* getProspectDocuments() {
  try {
    const state = yield select();
    const prospectID = getProspectId(state);
    const response = yield call(apiClient.getProspectDocuments.retriveDocuments, prospectID);
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
