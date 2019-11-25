import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { getProspectDocuments } from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";
import { updateProspect, setConfig } from "../actions/appConfig";

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

function* updateProspectDocuments(payload) {
  let clearedPersonalInfo, docDetails, indexValue, signatoryIndexName, signatoryDocIndex;
  if (payload.payload.type) {
    docDetails = payload.payload.type;
    indexValue = payload.payload.index;
  }

  // update the store value after getting the response

  if (docDetails === "companyDocument") {
    clearedPersonalInfo = {
      [`prospect.documents.companyDocuments[${indexValue}].uploadStatus`]: "Uploaded",
      [`prospect.documents.companyDocuments[${indexValue}].documentTitle`]: payload.payload
        .documents.documentType,
      [`prospect.documents.companyDocuments[${indexValue}].fileName`]: payload.docDetails.name,
      [`prospect.documents.companyDocuments[${indexValue}].fileSize`]: payload.docDetails.size,
      [`prospect.documents.companyDocuments[${indexValue}].submittedDt`]: payload.docDetails
        .lastModifiedDate,
      [`prospect.documents.companyDocuments[${indexValue}].fileFormat`]: payload.docDetails.type
    };
  } else if (docDetails === "stakeholdersDocuments") {
    signatoryDocIndex = payload.payload.signatoryDocIndex;
    signatoryIndexName = payload.payload.docUploadDetails[indexValue].signatoryName;
    clearedPersonalInfo = {
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].uploadStatus`]: "Updated",
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].documentTitle`]: payload.payload.documents.documentType,
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].fileName`]: payload.docDetails.name,
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].fileSize`]: payload.docDetails.size,
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].submittedDt`]: payload.docDetails.lastModifiedDate,
      [`prospect.documents.stakeholdersDocuments[${signatoryDocIndex +
        "_" +
        signatoryIndexName}][${indexValue}].fileFormat`]: payload.docDetails.type
    };
  }

  yield put(updateProspect(clearedPersonalInfo));
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
    takeLatest(actions.UPLOAD_SUCCESS, updateProspectDocuments),
    takeLatest(actions.EXTRA_DOC_UPLOAD_SUCCESS, updateExtraProspectDocuments),
    takeLatest(actions.DELETE_EXTRA_DOC_UPLOAD_SUCCESS, deleteExtraProspectDocuments)
  ]);
}
