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

function* updateProspectDocuments({ props, selectedFile, data, prospectId }) {
  let clearedPersonalInfo, docDetails, indexValue, signatoryIndexName, signatoryDocIndex;
  if (props.type) {
    docDetails = props.type;
    indexValue = props.index;
  }

  // update the store value after getting the response
  try {
    yield put(setProspect());
    const response = yield call(uploadProspectDocument.send, { data, prospectId, indexValue });
    if (response.status === 200) {
      if (docDetails === "companyDocument") {
        clearedPersonalInfo = {
          [`prospect.documents.companyDocuments[${indexValue}].uploadStatus`]: "Uploaded",
          [`prospect.documents.companyDocuments[${indexValue}].documentType`]: props.documents
            .documentType,
          [`prospect.documents.companyDocuments[${indexValue}].fileName`]: selectedFile.name,
          [`prospect.documents.companyDocuments[${indexValue}].fileSize`]: selectedFile.size,
          // eslint-disable-next-line max-len
          [`prospect.documents.companyDocuments[${indexValue}].submittedDt`]: selectedFile.lastModifiedDate,
          [`prospect.documents.companyDocuments[${indexValue}].fileFormat`]: selectedFile.type
        };
      } else if (docDetails === "stakeholdersDocuments") {
        signatoryDocIndex = props.signatoryDocIndex;
        signatoryIndexName = props.docUploadDetails[indexValue].signatoryName;
        clearedPersonalInfo = {
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].uploadStatus`]: "Updated",
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].documentType`]: props.documents.documentType,
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].fileName`]: selectedFile.name,
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].fileSize`]: selectedFile.size,
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].submittedDt`]: selectedFile.lastModifiedDate,
          [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
            "_" +
            signatoryIndexName}][${indexValue}].fileFormat`]: selectedFile.type
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
