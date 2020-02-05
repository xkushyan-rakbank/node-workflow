export const RETRIEVE_APPLICANT_INFO = "RETRIEVE_APPLICANT_INFO";
export const RETRIEVE_APPLICANT_INFO_SUCCESS = "RETRIEVE_APPLICANT_INFO_SUCCESS";
export const GET_PROSPECT_INFO = "GET_PROSPECT";
export const GET_SCREEN_BY_VIEW_ID = "GET_SCREEN_BY_VIEW_ID";

export const retrieveApplicantInfo = payload => {
  return { type: RETRIEVE_APPLICANT_INFO, payload };
};

export const retrieveApplicantInfoSuccess = payload => {
  return { type: RETRIEVE_APPLICANT_INFO_SUCCESS, payload };
};

export const getProspectInfo = payload => {
  return { type: GET_PROSPECT_INFO, payload };
};

export const getScreenByViewID = () => ({
  type: GET_SCREEN_BY_VIEW_ID
});
