export const SEARCH_APPLICATIONS = "SEARCH_APPLICATIONS";
export const SEARCH_APPLICATIONS_SUCCESS = "SEARCH_APPLICATIONS_SUCCESS";
export const SEARCH_APPLICATIONS_FAIL = "SEARCH_APPLICATIONS_FAIL";

export const GET_DOCUMENTS = "GET_DOCUMENTS";
export const GET_DOCUMENTS_SUCCESS = "GET_DOCUMENTS_SUCCESS";
export const GET_DOCUMENTS_FAIL = "GET_DOCUMENTS_FAIL";

export const searchApplications = payload => {
  return { type: SEARCH_APPLICATIONS, payload };
};

export const searchApplicationsSuccess = payload => {
  return { type: SEARCH_APPLICATIONS_SUCCESS, payload };
};

export const searchApplicationsFail = error => {
  return { type: SEARCH_APPLICATIONS_FAIL, error };
};

export const getDocuments = payload => {
  return { type: GET_DOCUMENTS, payload };
};

export const getDocumentsSuccess = payload => {
  return { type: GET_DOCUMENTS_SUCCESS, payload };
};

export const getDocumentsFail = error => {
  return { type: GET_DOCUMENTS_FAIL, error };
};
