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
import set from "lodash/set";
import cloneDeep from "lodash/cloneDeep";
import differenceBy from "lodash/differenceBy";

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
import { getUniqueCompanyDocs } from "../../utils/documents";

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
  const config = cloneDeep(state.appConfig);

  try {
    const response = yield call(getProspectDocuments.retriveDocuments, prospectID);

    //remove
    const response2 = {
      companyDocuments: [
        {
          documentType: "TradeLicenseNo",
          signatoryId: "",
          signatoryName: "",
          documentTitle: "",
          documentKey: "MGHN43MD75_TL",
          fileName: ""
        },
        {
          documentType: "sdcs",
          signatoryId: "",
          signatoryName: "",
          documentTitle: "",
          documentKey: "MGHN43MD75_TL",
          fileName: ""
        },
        {
          documentType: "cscvvfsee",
          signatoryId: "",
          signatoryName: "",
          documentTitle: "",
          documentKey: "MGHN43MD75_TL",
          fileName: ""
        },
        {
          documentType: "TradeLicenssssssseNo4",
          signatoryId: "",
          signatoryName: "",
          documentTitle: "",
          documentKey: "MGHN43MD75_TL",
          fileName: ""
        }
      ]
    };

    //remove
    const response3 = {
      stakeholdersDocuments: {
        "0_": {
          documents: [{ documentType: "Passport", signatoryId: "1", signatoryName: "Manohar" }]
        },
        "123_": {
          documents: [{ documentType: "qkwfnni", signatoryId: "1", signatoryName: "Manohar" }]
        }
      }
    };

    config.prospect.documents = response.data;

    //remove
    const companyDocsExist = config.prospect.documents.companyDocuments;
    const companyDocsIncome = response2.companyDocuments;
    const stakeholdersDocsIncome = response3.stakeholdersDocuments;
    const stakeholdersDocsExist = config.prospect.documents.stakeholdersDocuments;

    //companyDocs
    const companyDocuments = getUniqueCompanyDocs(companyDocsExist, companyDocsIncome);

    //stakeholdersDocs
    const objectToCollection = obj => {
      return Object.keys(obj)
        .map(key => {
          let array = Object.values(obj[key])
            .flat()
            .map(item => {
              return { ...item, key };
            });
          return array;
        })
        .flat();
    };

    const firstObj = objectToCollection(stakeholdersDocsExist);
    const secondObj = objectToCollection(stakeholdersDocsIncome);

    const stacke = differenceBy(secondObj, firstObj, "documentType");

    console.log(stacke);
    console.log(companyDocuments);

    yield put(updateProspect(config));
  } catch (error) {
    log(error);
  }
}

function* uploadDocumentsBgSync({ data, docProps, docOwner, documentType, documentKey }) {
  const source = CancelToken.source();

  try {
    const state = yield select();
    const prospectId = getProspectId(state) || "COSME0017";

    const [uploadPromise, chan] = yield call(createUploader, prospectId, data, source);

    yield fork(uploadProgressWatcher, chan, documentKey);

    yield call(() => uploadPromise);

    const config = { ...state.appConfig };
    const documents = config.prospect.documents[docOwner].map(doc => {
      if (doc.documentType === documentType) {
        return { ...doc, ...docProps };
      }

      return doc;
    });
    set(config, ["config", "prospect", "documents", docOwner], documents);
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
