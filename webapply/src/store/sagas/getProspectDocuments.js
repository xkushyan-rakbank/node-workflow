import { all, call, put, takeLatest, select } from "redux-saga/effects";
import cloneDeep from "lodash/cloneDeep";
import { getProspectDocuments, uploadProspectDocument } from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";
import { updateProspect, setConfig } from "../actions/appConfig";
import { log } from "../../utils/loggger";

function* getProspectDocumentsSaga() {
  const state = yield select();
  const prospectID = getProspectId(state) || "COSME0000000000000001";
  let config = { ...state.appConfig };

  try {
    const response = yield call(getProspectDocuments.retriveDocuments, prospectID);

    config.prospect.documents = response.data;
    yield put(updateProspect(config));
  } catch (error) {
    log(error);
  }
}

function* updateProspectDocuments({ data, docProps, docOwner, docType }) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);
  const prospectId = getProspectId(state) || "COSME0000000000000001";

  try {
    yield call(uploadProspectDocument.send, { prospectId, data });

    config.prospect.documents[docOwner].forEach(
      (doc, index, documents) =>
        doc.documentType === docType && (documents[index] = { ...doc, ...docProps })
    );

    yield put(setConfig(config));
  } catch (error) {
    log(error);
  }
}

function* updateExtraProspectDocuments(action) {
  const state = yield select();
  let config = { ...state.appConfig };

  config.prospect.documents.companyDocuments.push(action.payload);
  yield put(setConfig(config));
}

function* deleteExtraProspectDocuments(action) {
  const state = yield select();
  let config = { ...state.appConfig };

  config.prospect.documents.companyDocuments.splice(action.payload);
  yield put(setConfig(config));
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(actions.RETRIEVE_DOC_UPLOADER, getProspectDocumentsSaga),
    takeLatest(actions.DOC_UPLOADER, updateProspectDocuments),
    takeLatest(actions.EXTRA_DOC_UPLOAD_SUCCESS, updateExtraProspectDocuments),
    takeLatest(actions.DELETE_EXTRA_DOC_UPLOAD_SUCCESS, deleteExtraProspectDocuments)
  ]);
}
