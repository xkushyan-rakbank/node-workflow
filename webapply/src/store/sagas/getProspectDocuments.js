import { all, call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";
import cloneDeep from "lodash/cloneDeep";
import { setProspect } from "../actions/appConfig";

function* getProspectDocuments() {
  const state = yield select();
  const prospectID = getProspectId(state) || "COSME0000000000000001";
  let config = cloneDeep(state.appConfig);
  try {
    const response = yield call(apiClient.getProspectDocuments.retriveDocuments, prospectID);
    if (response.status === 200) {
      config.prospect.documents = response.data;
      yield put(setProspect(config));
    }
  } catch (error) {
    config.prospect.documents = error;
    yield put(setProspect(config));
  }
}

// function* updateProspectDocuments(payload) {
//   const state = yield select();
//   let  config = cloneDeep(state.appConfig);
//  console.log(payload)
// }

export default function* appConfigSaga() {
  yield all([takeLatest(actions.RETRIEVE_DOC_UPLOADER, getProspectDocuments)]);
  // yield all([takeLatest(actions.UPLOAD_SUCCESS, updateProspectDocuments)]);
}
