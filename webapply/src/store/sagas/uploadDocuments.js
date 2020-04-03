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
import get from "lodash/get";
import mapValues from "lodash/mapValues";
import { saveAs } from "file-saver";

import {
  getProspectDocuments,
  uploadProspectDocument,
  downloadProspectDocument
} from "../../api/apiClient";
import { getProspectId, getAuthorizationHeader, getDocuments } from "../selectors/appConfig";
import { getProspectStatus } from "../selectors/searchProspect";
import {
  RETRIEVE_DOC_UPLOADER,
  DOC_UPLOADER,
  CANCEL_DOC_UPLOAD,
  DOWNLOAD_DOCUMENT_FILE,
  uploadFilesProgress,
  uploadFilesFail,
  getProspectDocumentsSuccess,
  getProspectDocumentsFail,
  ADD_OTHER_DOCUMENT,
  DELETE_OTHER_DOCUMENT
} from "../actions/uploadDocuments";
import { sendProspectToAPIPromisify } from "../../store/actions/sendProspectToAPI";
import { updateProspect, setConfig } from "../actions/appConfig";
import { log } from "../../utils/loggger";
import {
  concatCompanyDocs,
  concatStakeholdersDocs,
  createDocumentMapper,
  appendDocumentKey
} from "../../utils/documents";
import { COMPANY_DOCUMENTS, OTHER_DOCUMENTS, STAKEHOLDER_DOCUMENTS } from "./../../constants";
import { PROSPECT_STATUSES } from "../../constants/index";

function createUploader(prospectId, data, source, headers) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const onUploadProgress = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };

  const uploadPromise = uploadProspectDocument.send({
    prospectId,
    data,
    source,
    onUploadProgress,
    headers
  });
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan, documentKey) {
  while (true) {
    const progress = yield take(chan);
    yield put(uploadFilesProgress({ [documentKey]: progress }));
  }
}

function* getProspectDocumentsSaga() {
  const state = yield select();
  const headers = getAuthorizationHeader(state);
  const prospectID = getProspectId(state);
  const existDocuments = getDocuments(state);
  const config = { ...state.appConfig };
  const isDocsUploaded =
    existDocuments &&
    existDocuments.companyDocuments.length > 0 &&
    existDocuments.stakeholdersDocuments;

  try {
    const { data } = yield call(getProspectDocuments.retriveDocuments, prospectID, headers);
    const companyDocs = appendDocumentKey(data.companyDocuments);
    const stakeHoldersDocs = mapValues(data.stakeholdersDocuments, stakeHolder => ({
      ...stakeHolder,
      documents: appendDocumentKey(stakeHolder.documents)
    }));

    const companyDocuments = concatCompanyDocs(
      isDocsUploaded ? existDocuments.companyDocuments : [],
      companyDocs
    );
    const stakeholdersDocuments = concatStakeholdersDocs(
      stakeHoldersDocs,
      isDocsUploaded ? existDocuments.stakeholdersDocuments : {}
    );
    const otherDocuments = existDocuments.otherDocuments || [];

    config.prospect.documents = { companyDocuments, stakeholdersDocuments, otherDocuments };
    yield put(updateProspect(config));
    yield put(getProspectDocumentsSuccess());
  } catch (error) {
    yield put(getProspectDocumentsFail());
    log(error);
  }
}

function* uploadDocumentsBgSync({
  data,
  docProps,
  docOwner,
  documentKey,
  stakeholderIndex,
  userFileName
}) {
  const source = CancelToken.source();

  try {
    const state = yield select();
    const config = { ...state.appConfig };
    const headers = getAuthorizationHeader(state);
    const prospectId = getProspectId(state);
    const prospectStatus = getProspectStatus(state);

    const [uploadPromise, chan] = yield call(createUploader, prospectId, data, source, headers);

    yield fork(uploadProgressWatcher, chan, documentKey);

    const response = yield call(() => uploadPromise);

    const documents = config.prospect.documents;
    const fileName = get(response, "data.fileName", "");
    const additionalProps = { ...docProps, fileName, fileDescription: userFileName };

    if (docOwner === COMPANY_DOCUMENTS || docOwner === OTHER_DOCUMENTS) {
      documents[docOwner] = documents[docOwner].map(
        createDocumentMapper(documentKey, additionalProps)
      );
    } else {
      const stakeholdersDocuments = documents[STAKEHOLDER_DOCUMENTS][
        stakeholderIndex
      ].documents.map(createDocumentMapper(documentKey, additionalProps));

      documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex].documents = stakeholdersDocuments;
    }

    yield put(setConfig(config));
    if (
      ![PROSPECT_STATUSES.DOCUMENTS_NEEDED, PROSPECT_STATUSES.NEED_ADDITIONAL_DOCUMENTS].includes(
        prospectStatus
      )
    ) {
      yield put(sendProspectToAPIPromisify());
    }
  } catch (error) {
    yield put(uploadFilesFail({ [documentKey]: error }));
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

function* uploadDocumentsFlowSaga({ payload }) {
  yield race({
    task: call(uploadDocumentsBgSync, payload),
    cancel: take(
      action =>
        action.type === CANCEL_DOC_UPLOAD && action.payload.documentKey === payload.documentKey
    )
  });
}

function* addOtherDocument({ payload }) {
  const state = yield select();
  const config = { ...state.appConfig };

  config.prospect.documents.otherDocuments.push(payload);
  yield put(setConfig(config));
}

function* deleteOtherDocument({ payload }) {
  const state = yield select();
  const config = { ...state.appConfig };

  config.prospect.documents.otherDocuments = config.prospect.documents.otherDocuments.filter(
    doc => doc.documentKey !== payload
  );
  yield put(setConfig(config));
}

function* downloadDocumentFileSaga({ payload: { prospectId, documentKey, fileName } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const { data } = yield call(downloadProspectDocument.get, prospectId, documentKey, headers);
    const blob = new Blob([data], { type: data.type });
    yield call(saveAs, blob, fileName);
  } catch (error) {
    log(error);
  }
}

export default function* appConfigSaga() {
  yield all([
    takeLatest(RETRIEVE_DOC_UPLOADER, getProspectDocumentsSaga),
    takeEvery(DOC_UPLOADER, uploadDocumentsFlowSaga),
    takeEvery(ADD_OTHER_DOCUMENT, addOtherDocument),
    takeEvery(DELETE_OTHER_DOCUMENT, deleteOtherDocument),
    takeLatest(DOWNLOAD_DOCUMENT_FILE, downloadDocumentFileSaga)
  ]);
}
