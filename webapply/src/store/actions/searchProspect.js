export const SEARCH_APPLICATIONS = "SEARCH_APPLICATIONS";
export const SEARCH_APPLICATIONS_SUCCESS = "SEARCH_APPLICATIONS_SUCCESS";
export const IS_APPLY_EDIT_APPLICATION = "IS_APPLY_EDIT_APPLICATION";

export const FORMAT_SEARCH_LIST = "FORMAT_SEARCH_LIST";

export const searchApplications = payload => {
  return { type: SEARCH_APPLICATIONS, payload };
};

export const searchApplicationsSuccess = payload => {
  return { type: SEARCH_APPLICATIONS_SUCCESS, payload };
};

export const formatSearchList = () => {
  return { type: FORMAT_SEARCH_LIST };
};

export const setIsApplyEditApplication = payload => {
  return { type: IS_APPLY_EDIT_APPLICATION, payload };
};
