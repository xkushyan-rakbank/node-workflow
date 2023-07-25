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
  downloadProspectDocument,
  documents
} from "../../api/apiClient";
import {
  getProspectId,
  getAuthorizationHeader,
  getAppConfig,
  getDocuments,
  getDocumentUploadCnt,
  getOrganizationInfo,
  getOrgKYCDetails,
  getDocumentsList,
  getDocumentUplaoderjwtToken,
  getDocuploaderHeader,
  getProspect
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
  SAVE_AND_RETRIEVE_DOC_UPLOADER,
  ADD_MULTI_DOCUMENT,
  INIT_DOCUMENT_UPLOAD,
  saveDocumentUplaodAuthToken,
  saveDocumentList,
  UPLOAD_DOCUMENTS,
  GET_DOCUMENTS_LIST
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
  appendDocumentKey,
  appendMultiDocumentKey
} from "../../utils/documents";
import { cloneDeep } from "../../utils/cloneDeep";
import {
  COMPANY_DOCUMENTS,
  OTHER_DOCUMENTS,
  STAKEHOLDER_DOCUMENTS,
  COMPANY_BANK_STATEMENTS,
  COMPANY_ADDRESS_PROOF,
  COMPANY_INVOICES,
  PERSONAL_BANK_STATEMENTS,
  PERSONAL_BACKGROUND,
  COMPANY_BANK_STATEMENTS_DOCTYPE,
  COMPANY_ADDRESS_PROOF_DOCTYPE,
  COMPANY_INVOICES_DOCTYPE,
  PERSONAL_BANK_STATEMENTS_DOCTYPE,
  PERSONAL_BACKGROUND_DOCTYPE,
  companyMultiDocs,
  stakeholderMultiDocs,
  BBG_COMPANY_INFO_MODULEID
} from "./../../constants";
import { PROSPECT_STATUSES } from "../../constants/index";
import { AUTO } from "../../constants";

export function createUploader(prospectId, data, source, headers) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => { };
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
  const organizationInfo = yield select(getOrganizationInfo);
  const orgKYCDetails = yield select(getOrgKYCDetails);
  const isDocsUploaded =
    existDocuments &&
    existDocuments.companyDocuments.length > 0 &&
    existDocuments.stakeholdersDocuments;
  try {
    const { data } = yield call(getProspectDocuments.retriveDocuments, prospectID, headers);
    const appConfig = cloneDeep(yield select(getAppConfig));
    const companyDocs = appendDocumentKey(data.companyDocuments);
    // ro-assist-brd2-1
    const companyBankStatements = appendMultiDocumentKey(data.companyBankStatements);
    const companyAddressProof = appendMultiDocumentKey(data.companyAddressProof);
    const companyInvoices = appendMultiDocumentKey(data.companyInvoices);
    const stakeHoldersDocs = mapValues(data.stakeholdersDocuments, stakeHolder => ({
      ...stakeHolder,
      documents: appendDocumentKey(stakeHolder.documents),
      personalBankStatements: appendMultiDocumentKey(stakeHolder.personalBankStatements),
      personalBackground: appendMultiDocumentKey(stakeHolder.personalBackground)
    }));

    const companyDocuments = concatCompanyDocs(
      isDocsUploaded ? existDocuments.companyDocuments : [],
      companyDocs
    );
    companyBankStatements.documents = concatCompanyDocs(
      isDocsUploaded && existDocuments.companyBankStatements
        ? existDocuments.companyBankStatements.documents
        : [],
      companyBankStatements.documents,
      COMPANY_BANK_STATEMENTS,
      organizationInfo,
      orgKYCDetails
    );
    companyBankStatements.isDocUpdate =
      isDocsUploaded && existDocuments.companyBankStatements
        ? existDocuments.companyBankStatements.isDocUpdate
        : companyBankStatements.isDocUpdate;
    companyAddressProof.documents = concatCompanyDocs(
      isDocsUploaded && existDocuments.companyAddressProof
        ? existDocuments.companyAddressProof.documents
        : [],
      companyAddressProof.documents,
      COMPANY_ADDRESS_PROOF,
      organizationInfo,
      orgKYCDetails
    );
    companyAddressProof.isDocUpdate =
      isDocsUploaded && existDocuments.companyAddressProof
        ? existDocuments.companyAddressProof.isDocUpdate
        : companyAddressProof.isDocUpdate;
    companyInvoices.documents = concatCompanyDocs(
      isDocsUploaded && existDocuments.companyInvoices
        ? existDocuments.companyInvoices.documents
        : [],
      companyInvoices.documents,
      COMPANY_INVOICES,
      organizationInfo,
      orgKYCDetails
    );
    companyInvoices.isDocUpdate =
      isDocsUploaded && existDocuments.companyInvoices
        ? existDocuments.companyInvoices.isDocUpdate
        : companyInvoices.isDocUpdate;
    const stakeholdersDocuments = concatStakeholdersDocs(
      stakeHoldersDocs,
      isDocsUploaded ? existDocuments.stakeholdersDocuments : {},
      organizationInfo,
      orgKYCDetails
    );

    const otherDocuments = existDocuments.otherDocuments || [];
    const isCompanyDocUpdate = existDocuments.isCompanyDocUpdate;

    appConfig.prospect.documents = {
      companyDocuments,
      companyBankStatements,
      companyAddressProof,
      companyInvoices,
      stakeholdersDocuments,
      isCompanyDocUpdate,
      otherDocuments
    };
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
  userFileName,
  isDocUpdate
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

    const documents = cloneDeep(config.prospect.documents);
    const fileName = get(response, "data.fileName", "");
    const docUploadedCount = get(response, "data.docUploadedCount", 0);
    const additionalProps = { ...docProps, fileName, fileDescription: userFileName };

    if (docOwner === COMPANY_DOCUMENTS) {
      documents[docOwner] = documents[docOwner].map(
        createDocumentMapper(documentKey, additionalProps)
      );
      documents.isCompanyDocUpdate = isDocUpdate;
    } else if (docOwner === OTHER_DOCUMENTS) {
      documents[docOwner] = documents[docOwner].map(
        createDocumentMapper(documentKey, additionalProps)
      );
    } else if (companyMultiDocs.includes(docOwner)) {
      documents[docOwner].documents = documents[docOwner].documents.map(
        createDocumentMapper(documentKey, additionalProps)
      );
      documents[docOwner].isDocUpdate = isDocUpdate;
    } else {
      if (stakeholderMultiDocs.includes(docOwner)) {
        const stakeholdersDocuments = documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex][
          docOwner
        ].documents.map(createDocumentMapper(documentKey, additionalProps));

        documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex][
          docOwner
        ].documents = stakeholdersDocuments;
        documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex][docOwner].isDocUpdate = isDocUpdate;
      } else {
        const stakeholdersDocuments = documents[STAKEHOLDER_DOCUMENTS][
          stakeholderIndex
        ].documents.map(createDocumentMapper(documentKey, additionalProps));

        documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex].documents = stakeholdersDocuments;
        documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex].isDocUpdate = isDocUpdate;
      }
    }

    yield put(
      updateProspect({
        "prospect.documents": documents
      })
    );
    yield call(increaseDocumentUploadCountSaga, docUploadedCount, documents);
    if (
      docUploadedCount >= maxDocumentUploadCnt &&
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

export function* increaseDocumentUploadCountSaga(docUploadedCount, documents = null) {
  try {
    if (!documents) {
      const state = yield select();
      const appConfig = { ...state.appConfig };
      documents = cloneDeep(appConfig.prospect.documents);
    }

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

    yield put(
      updateProspect({
        "prospect.documents": documents
      })
    );
  } catch (error) {
    log(error);
  }
}

export function* addMultiDocumentSaga({ payload }) {
  const { stakeholderIndex, document } = payload;
  const config = cloneDeep(yield select(getAppConfig));
  if (document.documentType === COMPANY_BANK_STATEMENTS_DOCTYPE) {
    config.prospect.documents[COMPANY_BANK_STATEMENTS].documents.push(document);
  } else if (document.documentType === COMPANY_ADDRESS_PROOF_DOCTYPE) {
    config.prospect.documents[COMPANY_ADDRESS_PROOF].documents.push(document);
  } else if (document.documentType === COMPANY_INVOICES_DOCTYPE) {
    config.prospect.documents[COMPANY_INVOICES].documents.push(document);
  } else if (document.documentType === PERSONAL_BANK_STATEMENTS_DOCTYPE) {
    config.prospect.documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex][
      PERSONAL_BANK_STATEMENTS
    ].documents.push(document);
  } else if (document.documentType === PERSONAL_BACKGROUND_DOCTYPE) {
    config.prospect.documents[STAKEHOLDER_DOCUMENTS][stakeholderIndex][
      PERSONAL_BACKGROUND
    ].documents.push(document);
  }

  yield put(setConfig(config));
}

export function* initDocumentUpload() {
  try {
    // const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const token = yield call(documents.requestClientToken, headers);
    yield put(saveDocumentUplaodAuthToken(token.data));
  } catch (error) {
    log(error);
  }
}

export function* getDocumentList() {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getAuthorizationHeader);
    const documentList = yield call(documents.getDocumentList, prospectId, headers);
    yield put(saveDocumentList(documentList.data));
  } catch (error) {
    log(error);
  }
}

export function* uploadDocuments({ payload }) {
  try {
    const prospectId = yield select(getProspectId);
    const headers = yield select(getDocuploaderHeader);
    const token = yield select(getDocumentUplaoderjwtToken);
    const documentList = yield select(getDocumentsList);
    const prospect = yield select(getProspect);
    // find the respective document section from documentList
    const documentSection = get(documentList, payload.documentSection);
    const index = payload.index;
    const uploadedList = get(
      prospect,
      `documents.${payload.saveProspectPath || payload.documentSection}`
    );
    const newUplaodedLsit = uploadedList && uploadedList.length ? uploadedList : null;
    const documentSectionArray =
      documentSection && documentSection.length ? documentSection : documentSection.documents;
    const uploadedDocuments = newUplaodedLsit || [];
    for (let docPath in payload.docs) {
      const docItem = documentSectionArray.find(doc => doc.documentTitle === docPath);
      const fieldData = payload.docs[docPath];
      if (fieldData.name) {
        const documentUniq =
          index !== undefined ? `${docItem.documentTitle}-${index}` : `${docItem.documentTitle}`;
        let generateName = [
          BBG_COMPANY_INFO_MODULEID,
          prospectId,
          docItem.documentType,
          fieldData.name
        ];
        const fileData = {
          documentType: fieldData.type,
          documentTitle: documentUniq,
          fileName: generateName.join("_"),
          fileFormat: fieldData.type,
          fileSize: fieldData.size,
          file: fieldData
        };
        //await documents.upload(fileData, token, prospectId, headers);
        const response = yield call(documents.upload, fileData, token, prospectId, headers);
        uploadedDocuments.push({
          documentKey: documentUniq,
          documentType: fieldData.type,
          fileFormat: fieldData.type,
          fileName: response.data.fileName,
          fileDescription: fieldData.name,
          fileSize: fieldData.size,
          submittedDt: new Date().toISOString()
        });
      }
    }
    if (uploadedDocuments.length) {
      yield put(
        updateProspect({
          [`prospect.documents.${payload.saveProspectPath ||
            payload.documentSection}`]: uploadedDocuments
        })
      );
    }
    payload.onSuccess();
  } catch (error) {
    payload.onFailure();
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
    takeLatest(DOWNLOAD_DOCUMENT_FILE, downloadDocumentFileSaga),
    takeEvery(ADD_MULTI_DOCUMENT, addMultiDocumentSaga),
    takeEvery(INIT_DOCUMENT_UPLOAD, initDocumentUpload),
    takeEvery(GET_DOCUMENTS_LIST, getDocumentList),
    takeEvery(UPLOAD_DOCUMENTS, uploadDocuments)
  ]);
}
