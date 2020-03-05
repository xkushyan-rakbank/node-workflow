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
export const REMOVE_PROSPECT_ID = "REMOVE_PROSPECT_ID";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const docUpload = payload => {
  return { type: DOC_UPLOADER, payload };
};

export const cancelDocUpload = documentKey => {
  return { type: CANCEL_DOC_UPLOAD, payload: { documentKey } };
};

export const uploadFilesProgress = progress => {
  return { type: UPLOAD_FILES_PROGRESS, progress };
};

export const uploadFilesFail = error => {
  return { type: UPLOAD_FILES_FAIL, error };
};

export const getProspectDocumentsSuccess = () => ({ type: GET_PROSPECT_DOCUMENTS_SUCCESS });

export const getProspectDocumentsFail = () => ({ type: GET_PROSPECT_DOCUMENTS_FAIL });

export const downloadDocumentFile = (prospectId, documentKey, fileName) => {
  return { type: DOWNLOAD_DOCUMENT_FILE, payload: { prospectId, documentKey, fileName } };
};

export const addOtherDocument = document => {
  return { type: ADD_OTHER_DOCUMENT, payload: document };
};

export const deleteOtherDocument = index => {
  return { type: DELETE_OTHER_DOCUMENT, payload: index };
};

export const removeProspectId = () => {
  return { type: REMOVE_PROSPECT_ID };
};
