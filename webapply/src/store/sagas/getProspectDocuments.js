import { all, call, put, takeLatest, select } from "redux-saga/effects";
import apiClient from "../../api/apiClient";
import { getProspectId } from "../selectors/appConfig";
import * as actions from "../actions/getProspectDocuments";
import cloneDeep from "lodash/cloneDeep";
import { updateProspect } from "../actions/appConfig";

function* getProspectDocuments() {
  const state = yield select();
  const prospectID = getProspectId(state) || "COSME0000000000000001";
  let config = cloneDeep(state.appConfig);
  try {
    const response = yield call(apiClient.getProspectDocuments.retriveDocuments, prospectID);
    if (response.status === 200) {
      config.prospect.documents = response.data;
      yield put(updateProspect(config));
    }
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
      [`prospect.documents.companyDocuments[${indexValue}].uploadStatus`]: "Updated",
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

export default function* appConfigSaga() {
  yield all([
    takeLatest(actions.RETRIEVE_DOC_UPLOADER, getProspectDocuments),
    takeLatest(actions.UPLOAD_SUCCESS, updateProspectDocuments)
  ]);
}
