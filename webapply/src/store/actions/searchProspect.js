export const SEARCH_APPLICATIONS = "SEARCH_APPLICATIONS";
export const SEARCH_APPLICATIONS_SUCCESS = "SEARCH_APPLICATIONS_SUCCESS";
export const SEARCH_APPLICATIONS_FAIL = "ASEARCH_APPLICATIONS_FAIL";

export const searchApplications = payload => {
  return { type: SEARCH_APPLICATIONS, payload };
};

export const searchApplicationsSuccess = payload => {
  return { type: SEARCH_APPLICATIONS_SUCCESS, payload };
};

export const searchApplicationsFail = error => {
  return { type: SEARCH_APPLICATIONS_FAIL, error };
};
