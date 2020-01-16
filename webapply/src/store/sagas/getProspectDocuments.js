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
import get from "lodash/get";
import { eventChannel, END } from "redux-saga";
import { CancelToken } from "axios";
import cloneDeep from "lodash/cloneDeep";
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
import { concatCompanyDocs, concatStakeholdersDocs } from "../../utils/documents";

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

  try {
    const { data } = yield call(getProspectDocuments.retriveDocuments, prospectID);

    if (existDocuments) {
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

    if (docOwner === "companyDocuments") {
      const companyDocuments = config.prospect.documents[docOwner].map(doc => {
        if (doc.documentType === documentType) {
          return { ...doc, ...docProps, fileName: get(response, "data.fileName", "") };
        }

        return doc;
      });
      config.prospect.documents[docOwner] = companyDocuments;
    } else {
      const mergeObjectToCollection = obj =>
        Object.keys(obj)
          .map(key =>
            Object.values(obj[key])
              .flat()
              .map(item => ({ ...item, key }))
          )
          .flat();

      const stakeholdersDocuments = mergeObjectToCollection(
        config.prospect.documents[docOwner]
      ).map(doc => {
        if (doc.documentType === documentType) {
          return { ...doc, ...docProps, fileName: get(response, "data.fileName", "") };
        }

        return doc;
      });

      stakeholdersDocuments.forEach(
        doc => (config.prospect.documents[docOwner][doc.key].documents[index] = doc)
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
