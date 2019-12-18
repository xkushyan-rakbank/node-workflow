import {
  all,
  call,
  put,
  take,
  fork,
  race,
  select,
  takeLatest,
  takeEvery,
  cancelled
} from "redux-saga/effects";
import { eventChannel, END } from "redux-saga";
import { CancelToken } from "axios";
import cloneDeep from "lodash/cloneDeep";
import { getProspectDocuments, uploadProspectDocument } from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import {
  RETRIEVE_DOC_UPLOADER,
  DOC_UPLOADER,
  EXTRA_DOC_UPLOAD_SUCCESS,
  DELETE_EXTRA_DOC_UPLOAD_SUCCESS,
  uploadFilesProgress,
  CANCEL_DOC_UPLOAD
} from "../actions/getProspectDocuments";
import { updateProspect, setConfig } from "../actions/appConfig";
import { log } from "../../utils/loggger";

function createUploader(prospectId, data, source) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };

  const uploadPromise = uploadProspectDocument.send({ prospectId, data, source, uploadProgressCb });
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) {
    const progress = yield take(chan);
    yield put(uploadFilesProgress(progress));
  }
}

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

    const [uploadPromise, chan] = yield call(createUploader, prospectId, data, source);

    yield fork(uploadProgressWatcher, chan);

    yield call(() => uploadPromise);

    config.prospect.documents[docOwner].forEach(
      (doc, index, documents) =>
        doc.documentType === docType && (documents[index] = { ...doc, ...docProps })
    );

    yield put(setConfig(config));
  } catch (error) {
    log(error);
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

function* uploadDocumentsFlowSaga({ data, docProps, docOwner, docType, index }) {
  yield race({
    task: call(uploadDocumentsBgSync, data, docProps, docOwner, docType),
    cancel: take(action => {
      if (action.type === "CANCEL_DOC_UPLOAD" && action.index === index) {
        return CANCEL_DOC_UPLOAD;
      }
    })
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
