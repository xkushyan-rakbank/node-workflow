import {
  all,
  call,
  put,
  take,
  takeLatest,
  select,
  takeEvery,
  race,
  cancelled
} from "redux-saga/effects";
import { CancelToken } from "axios";
import cloneDeep from "lodash/cloneDeep";
import { getProspectDocuments, uploadProspectDocument } from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import {
  RETRIEVE_DOC_UPLOADER,
  DOC_UPLOADER,
  EXTRA_DOC_UPLOAD_SUCCESS,
  DELETE_EXTRA_DOC_UPLOAD_SUCCESS
} from "../actions/getProspectDocuments";
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

function* uploadDocumentsBgSync(data, docProps, docOwner, docType) {
  const source = CancelToken.source();
  try {
    const state = yield select();
    const config = cloneDeep(state.appConfig);
    const prospectId = getProspectId(state) || "COSME0017";

    yield call(uploadProspectDocument.send, { prospectId, data, source });

    config.prospect.documents[docOwner].forEach(
      (doc, index, documents) =>
        doc.documentType === docType && (documents[index] = { ...doc, ...docProps })
    );

    yield put(setConfig(config));
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

function* uploadDocumentsFlowSaga({ data, docProps, docOwner, docType }) {
  yield race({
    task: call(uploadDocumentsBgSync, data, docProps, docOwner, docType),
    cancel: take("CANCEL_DOC_UPLOAD")
  });
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
    takeLatest(RETRIEVE_DOC_UPLOADER, getProspectDocumentsSaga),
    takeEvery(DOC_UPLOADER, uploadDocumentsFlowSaga),
    takeLatest(EXTRA_DOC_UPLOAD_SUCCESS, updateExtraProspectDocuments),
    takeLatest(DELETE_EXTRA_DOC_UPLOAD_SUCCESS, deleteExtraProspectDocuments)
  ]);
}
