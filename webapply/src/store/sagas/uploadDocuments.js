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
import {
  getProspectId,
  getAuthorizationHeader,
  getAppConfig,
  getDocuments,
  getDocumentUploadCnt
} from "../selectors/appConfig";
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
  DELETE_OTHER_DOCUMENT,
  SAVE_AND_RETRIEVE_DOC_UPLOADER
} from "../actions/uploadDocuments";
import {
  SEND_PROSPECT_TO_API_FAIL,
  SEND_PROSPECT_TO_API_SUCCESS,
  sendProspectToAPI
} from "../../store/actions/sendProspectToAPI";
import { updateProspect, setConfig } from "../actions/appConfig";
import { log } from "../../utils/loggger";
import {
  concatCompanyDocs,
  concatStakeholdersDocs,
  createDocumentMapper,
  appendDocumentKey
} from "../../utils/documents";
import { cloneDeep } from "../../utils/cloneDeep";
import { COMPANY_DOCUMENTS, OTHER_DOCUMENTS, STAKEHOLDER_DOCUMENTS } from "./../../constants";
import { PROSPECT_STATUSES } from "../../constants/index";
import { AUTO } from "../../constants";

export function createUploader(prospectId, data, source, headers) {
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

export function* uploadProgressWatcher(chan, documentKey) {
  while (true) {
    const progress = yield take(chan);
    yield put(uploadFilesProgress({ [documentKey]: progress }));
  }
}

export function* saveProspectAndGetProspectDocumentsSaga() {
  yield put(sendProspectToAPI(AUTO));
  yield race([take(SEND_PROSPECT_TO_API_SUCCESS), take(SEND_PROSPECT_TO_API_FAIL)]);
  yield call(getProspectDocumentsSaga);
}

/* istanbul ignore next */
function* getProspectDocumentsSaga() {
  const headers = yield select(getAuthorizationHeader);
  const prospectID = yield select(getProspectId);
  const existDocuments = yield select(getDocuments);
  const isDocsUploaded =
    existDocuments &&
    existDocuments.companyDocuments.length > 0 &&
    existDocuments.stakeholdersDocuments;

  try {
    const { data } = yield call(getProspectDocuments.retriveDocuments, prospectID, headers);
    const appConfig = cloneDeep(yield select(getAppConfig));
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

    appConfig.prospect.documents = { companyDocuments, stakeholdersDocuments, otherDocuments };
    yield put(updateProspect(appConfig));
    yield put(getProspectDocumentsSuccess());
  } catch (error) {
    yield put(getProspectDocumentsFail());
    log(error);
  }
}

/* istanbul ignore next */
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
    const maxDocumentUploadCnt = yield select(getDocumentUploadCnt);

    const [uploadPromise, chan] = yield call(createUploader, prospectId, data, source, headers);

    yield fork(uploadProgressWatcher, chan, documentKey);

    const response = yield call(() => uploadPromise);

    const documents = config.prospect.documents;
    const fileName = get(response, "data.fileName", "");
    const docUploadedCount = get(response, "data.docUploadedCount", 0);
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
    yield call(increaseDocumentUploadCountSaga, docUploadedCount);
    if ((docUploadedCount >= maxDocumentUploadCnt) &&
      ![PROSPECT_STATUSES.DOCUMENTS_NEEDED, PROSPECT_STATUSES.NEED_ADDITIONAL_DOCUMENTS].includes(
        prospectStatus
      )
    ) {
      yield put(sendProspectToAPI());
    }
  } catch (error) {
    const errResponse = error.response.data;
    if (errResponse.statusCode === 403 && errResponse.errorType === "COUNT_EXCEEDED") {
      yield call(increaseDocumentUploadCountSaga, errResponse.docUploadedCount);
    } else {
      yield put(uploadFilesFail({ [documentKey]: error }));
    }
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

export function* uploadDocumentsFlowSaga({ payload }) {
  yield race({
    task: call(uploadDocumentsBgSync, payload),
    cancel: take(
      action =>
        action.type === CANCEL_DOC_UPLOAD && action.payload.documentKey === payload.documentKey
    )
  });
}

export function* addOtherDocumentSaga({ payload }) {
  const config = cloneDeep(yield select(getAppConfig));

  config.prospect.documents.otherDocuments.push(payload);
  yield put(setConfig(config));
}

export function* deleteOtherDocumentSaga({ payload }) {
  const config = cloneDeep(yield select(getAppConfig));

  config.prospect.documents.otherDocuments = config.prospect.documents.otherDocuments.filter(
    doc => doc.documentKey !== payload
  );
  yield put(setConfig(config));
}

export function* downloadDocumentFileSaga({ payload: { prospectId, documentKey, fileName } }) {
  try {
    const headers = yield select(getAuthorizationHeader);
    const { data } = yield call(downloadProspectDocument.get, prospectId, documentKey, headers);
    const blob = new Blob([data], { type: data.type });
    yield call(saveAs, blob, fileName);
  } catch (error) {
    log(error);
  }
}

export function* increaseDocumentUploadCountSaga(docUploadedCount) {
  try {
    const state = yield select();
    const appConfig = { ...state.appConfig };
    let documents = appConfig.prospect.documents;
    documents.companyDocuments &&
      documents.companyDocuments.map((companyDoc, companyDocIndex) => {
        documents.companyDocuments[companyDocIndex].DocumentUplTotalCnt = docUploadedCount;
      });

    Object.keys(documents.stakeholdersDocuments).map(shDocsIndex => {
      Object.keys(documents.stakeholdersDocuments[shDocsIndex].documents).map(shDocIndex => {
        const doc = documents.stakeholdersDocuments[shDocsIndex].documents[shDocIndex];
        doc.DocumentUplTotalCnt = docUploadedCount;
      });
    });

    documents.otherDocuments &&
      documents.otherDocuments.map((otherDoc, otherDocIndex) => {
        documents.otherDocuments[otherDocIndex].DocumentUplTotalCnt = docUploadedCount;
      });

    appConfig.prospect.documents = documents;
    yield put(updateProspect(appConfig));
  } catch (error) {
    log(error);
  }
}

export default function* uploadDocumentsSaga() {
  yield all([
    takeLatest(SAVE_AND_RETRIEVE_DOC_UPLOADER, saveProspectAndGetProspectDocumentsSaga),
    takeLatest(RETRIEVE_DOC_UPLOADER, getProspectDocumentsSaga),
    takeEvery(DOC_UPLOADER, uploadDocumentsFlowSaga),
    takeEvery(ADD_OTHER_DOCUMENT, addOtherDocumentSaga),
    takeEvery(DELETE_OTHER_DOCUMENT, deleteOtherDocumentSaga),
    takeLatest(DOWNLOAD_DOCUMENT_FILE, downloadDocumentFileSaga)
  ]);
}
