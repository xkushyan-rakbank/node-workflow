export const RETRIEVE_DOC_UPLOADER = "RETRIEVE_DOC_UPLOADER";
export const DOC_UPLOADER = "DOC_UPLOADER";
export const EXTRA_DOC_UPLOAD_SUCCESS = "EXTRA_DOC_UPLOAD_SUCCESS";
export const DELETE_EXTRA_DOC_UPLOAD_SUCCESS = "DELETE_EXTRA_DOC_UPLOAD_SUCCESS";
export const CANCEL_DOC_UPLOAD = "CANCEL_DOC_UPLOAD";
export const START_DOC_UPLOAD = "START_DOC_UPLOAD";
export const UPLOAD_FILES_FAIL = "UPLOAD_FILES_FAIL";
export const UPLOAD_FILES_PROGRESS = "UPLOAD_FILES_PROGRESS";
export const GET_PROSPECT_DOCUMENTS_SUCCESS = "GET_PROSPECT_DOCUMENTS_SUCCESS";
export const GET_PROSPECT_DOCUMENTS_FAIL = "GET_PROSPECT_DOCUMENTS_FAIL";
export const GET_PROSPECT_DOCUMENTS_REQUEST = "GET_PROSPECT_DOCUMENTS_REQUEST";
export const DOWNLOAD_DOCUMENT_FILE = "DOWNLOAD_DOCUMENT_FILE";

export const retrieveDocDetails = () => {
  return { type: RETRIEVE_DOC_UPLOADER };
};

export const docUpload = payload => {
  return { type: DOC_UPLOADER, payload };
};

export const extraDocUploadSuccess = payload => {
  return { type: EXTRA_DOC_UPLOAD_SUCCESS, payload };
};

export const deleteExtraDocUploadSuccess = payload => {
  return { type: DELETE_EXTRA_DOC_UPLOAD_SUCCESS, payload };
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
