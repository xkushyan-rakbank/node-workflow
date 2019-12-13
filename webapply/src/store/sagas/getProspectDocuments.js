import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { getProspectDocuments, uploadProspectDocument } from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";
import {
  setProspect,
  setProspectFail,
  setProspectSuccess,
  updateProspect,
  setConfig
} from "../actions/appConfig";
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
    config.prospect.documents = error;
    yield put(updateProspect(config));
  }
}

function* updateProspectDocuments({ props, selectedFile, data, prospectId, setProgress }) {
  let clearedPersonalInfo, docDetails, indexValue, signatoryIndexName, signatoryDocIndex;
  if (props.type) {
    docDetails = props.type;
    indexValue = props.index;
  }

  try {
    yield put(setProspect());
    const response = yield call(uploadProspectDocument.send, {
      prospectId,
      data,
      setProgress
    });
    if (response.status === 200) {
      if (docDetails === "companyDocument") {
        const companyDocuments = `prospect.documents.companyDocuments[${indexValue}]`;
        clearedPersonalInfo = {
          [`${companyDocuments}.uploadStatus`]: "Uploaded",
          [`${companyDocuments}.documentType`]: props.documents.documentType,
          [`${companyDocuments}.fileName`]: selectedFile.name,
          [`${companyDocuments}.fileSize`]: selectedFile.size,
          [`${companyDocuments}.submittedDt`]: selectedFile.lastModifiedDate,
          [`${companyDocuments}.fileFormat`]: selectedFile.type
        };
      } else if (docDetails === "stakeholdersDocuments") {
        signatoryDocIndex = props.signatoryDocIndex;
        signatoryIndexName = props.docUploadDetails[indexValue].signatoryName;
        // eslint-disable-next-line max-len
        const stakeholdersDocuments = `prospect.documents.stakeholdersDocuments[${signatoryDocIndex}_${signatoryIndexName}][${indexValue}]`;

        clearedPersonalInfo = {
          [`${stakeholdersDocuments}.uploadStatus`]: "Updated",
          [`${stakeholdersDocuments}.documentType`]: props.documents.documentType,
          [`${stakeholdersDocuments}.fileName`]: selectedFile.name,
          [`${stakeholdersDocuments}.fileSize`]: selectedFile.size,
          [`${stakeholdersDocuments}.submittedDt`]: selectedFile.lastModifiedDate,
          [`${stakeholdersDocuments}.fileFormat`]: selectedFile.type
        };
      }
      yield put(setProspectSuccess(clearedPersonalInfo));
    } else {
      yield put(setProspectFail(true));
    }
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
