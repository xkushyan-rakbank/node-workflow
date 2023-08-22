export const SAVE_AND_RETRIEVE_DOC_UPLOADER = "SAVE_AND_RETRIEVE_DOC_UPLOADER";
export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const DOC_UPLOADER = "DOC_UPLOADER";
export const ADD_OTHER_DOCUMENT = "ADD_OTHER_DOCUMENT";
export const DELETE_OTHER_DOCUMENT = "DELETE_OTHER_DOCUMENT";
export const CANCEL_DOC_UPLOAD = "CANCEL_DOC_UPLOAD";
export const UPLOAD_FILES_FAIL = "UPLOAD_FILES_FAIL";
export const UPLOAD_FILES_PROGRESS = "UPLOAD_FILES_PROGRESS";
export const GET_PROSPECT_DOCUMENTS_SUCCESS = "GET_PROSPECT_DOCUMENTS_SUCCESS";
export const GET_PROSPECT_DOCUMENTS_FAIL = "GET_PROSPECT_DOCUMENTS_FAIL";
export const DOWNLOAD_DOCUMENT_FILE = "DOWNLOAD_DOCUMENT_FILE";
export const ADD_MULTI_DOCUMENT = "ADD_MULTI_DOCUMENT";
export const INIT_DOCUMENT_UPLOAD = "INIT_DOCUMENT_UPLOAD";
export const SAVE_DOCUMENT_UPLOAD_AUTH_TOKEN = "SAVE_DOCUMENT_UPLOAD_AUTH_TOKEN";
export const GET_DOCUMENTS_LIST = "GET_DOCUMENTS_LIST";
export const SAVE_DOCUMENT_LIST = "SAVE_DOCUMENT_LIST";
export const UPLOAD_DOCUMENTS = "UPLOAD_DOCUMENTS";
export const DOCUMENTS_UPLOAD_COMPLETED = "DOCUMENTS_UPLOAD_COMPLETED";
export const UPLOAD_ADDITIONAL_DOCUMENTS = "UPLOAD_ADDITIONAL_DOCUMENTS";

export const saveAndRetrieveDocDetails = () => ({
  type: SAVE_AND_RETRIEVE_DOC_UPLOADER
});

export const retrieveDocDetails = () => ({ type: RETRIEVE_DOC_UPLOADER });

export const docUpload = payload => ({ type: DOC_UPLOADER, payload });

export const cancelDocUpload = documentKey => ({
  type: CANCEL_DOC_UPLOAD,
  payload: { documentKey }
});

export const uploadFilesProgress = progress => ({ type: UPLOAD_FILES_PROGRESS, progress });

export const uploadFilesFail = error => ({ type: UPLOAD_FILES_FAIL, error });

export const getProspectDocumentsSuccess = () => ({ type: GET_PROSPECT_DOCUMENTS_SUCCESS });

export const getProspectDocumentsFail = () => ({ type: GET_PROSPECT_DOCUMENTS_FAIL });

export const downloadDocumentFile = (prospectId, documentKey, fileName) => ({
  type: DOWNLOAD_DOCUMENT_FILE,
  payload: { prospectId, documentKey, fileName }
});

export const addOtherDocument = document => ({ type: ADD_OTHER_DOCUMENT, payload: document });

export const deleteOtherDocument = index => ({ type: DELETE_OTHER_DOCUMENT, payload: index });

// ro-assist-brd2-1
export const addMultiDocument = document => ({ type: ADD_MULTI_DOCUMENT, payload: document });

//documentUpload DEH
export const initDocumentUpload = () => ({ type: INIT_DOCUMENT_UPLOAD });

export const saveDocumentUplaodAuthToken = payload => ({
  type: SAVE_DOCUMENT_UPLOAD_AUTH_TOKEN,
  payload
});

export const getDocumentsList = () => ({ type: GET_DOCUMENTS_LIST });

export const saveDocumentList = payload => ({ type: SAVE_DOCUMENT_LIST, payload });

export const uploadDocuments = payload => ({ type: UPLOAD_DOCUMENTS, payload });

export const uploadAdditionalDocuments = payload => ({
  type: UPLOAD_ADDITIONAL_DOCUMENTS,
  payload
});

export const documentsUploadCompleted = payload => ({
  type: DOCUMENTS_UPLOAD_COMPLETED,
  payload
});
