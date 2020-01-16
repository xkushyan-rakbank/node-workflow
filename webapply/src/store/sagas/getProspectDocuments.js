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
import get from "lodash/get";
import { getProspectDocuments, uploadProspectDocument } from "../../api/apiClient";
import { getProspectId, getProspectDocuments as getDocuments } from "../selectors/appConfig";
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
import {
  concatCompanyDocs,
  concatStakeholdersDocs,
  mergeObjectToCollection,
  createDocumentMapper
} from "../../utils/documents";
import { COMPANY_DOCUMENTS, STAKEHOLDER_DOCUMENTS } from "./../../constants";

function createUploader(prospectId, data, source) {
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

  const uploadPromise = uploadProspectDocument.send({ prospectId, data, source, onUploadProgress });
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
  const prospectID = getProspectId(state) || "COSME0000000000000001";
  const existDocuments = getDocuments(state);
  const config = cloneDeep(state.appConfig);
  const isDocsUploaded =
    existDocuments &&
    existDocuments.companyDocuments.length > 0 &&
    existDocuments.stakeholdersDocuments;

  try {
    const { data } = yield call(getProspectDocuments.retriveDocuments, prospectID);

    if (isDocsUploaded) {
      const companyDocuments = concatCompanyDocs(
        existDocuments.companyDocuments,
        data.companyDocuments
      );
      const stakeholderDocuments = concatStakeholdersDocs(
        data.stakeholdersDocuments,
        existDocuments.stakeholdersDocuments
      );

      config.prospect.documents = {
        companyDocuments,
        stakeholderDocuments
      };
    } else {
      config.prospect.documents = data;
    }

    yield put(updateProspect(config));
  } catch (error) {
    log(error);
  }
}

function* uploadDocumentsBgSync({ data, docProps, docOwner, documentType, documentKey, index }) {
  const source = CancelToken.source();

  try {
    const state = yield select();
    const prospectId = getProspectId(state) || "COSME0017";

    const [uploadPromise, chan] = yield call(createUploader, prospectId, data, source);

    yield fork(uploadProgressWatcher, chan, documentKey);

    const response = yield call(() => uploadPromise);

    const config = cloneDeep(state.appConfig);
    const documents = config.prospect.documents;
    const fileName = get(response, "data.fileName", "");
    const additionalProps = { ...docProps, fileName };

    if (docOwner === COMPANY_DOCUMENTS) {
      const companyDocuments = documents[COMPANY_DOCUMENTS].map(
        createDocumentMapper(documentType, additionalProps)
      );

      documents[COMPANY_DOCUMENTS] = companyDocuments;
    } else {
      const stakeholderDocuments = mergeObjectToCollection(documents[STAKEHOLDER_DOCUMENTS]).map(
        createDocumentMapper(documentType, additionalProps)
      );

      stakeholderDocuments.forEach(
        doc => (documents[STAKEHOLDER_DOCUMENTS][doc.key].documents[index] = doc)
      );
    }

    yield put(setConfig(config));
  } catch (error) {
    log(error);
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

function* updateExtraProspectDocuments(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);

  config.prospect.documents.companyDocuments.push(action.payload);
  yield put(setConfig(config));
}

function* deleteExtraProspectDocuments(action) {
  const state = yield select();
  const config = cloneDeep(state.appConfig);

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
