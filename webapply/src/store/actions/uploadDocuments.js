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
