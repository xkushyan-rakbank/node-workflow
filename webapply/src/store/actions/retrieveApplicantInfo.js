export const RETRIEVE_APPLICANT_INFO = "RETRIEVE_APPLICANT_INFO";
export const RETRIEVE_APPLICANT_INFO_SUCCESS = "RETRIEVE_APPLICANT_INFO_SUCCESS";
export const GET_PROSPECT_INFO = "GET_PROSPECT";

export const retrieveApplicantInfo = payload => {
  return { type: RETRIEVE_APPLICANT_INFO, payload };
};

export const retrieveApplicantInfoSuccess = payload => {
  return { type: RETRIEVE_APPLICANT_INFO_SUCCESS, payload };
};

export const getProspectInfo = (prospectId, isUpdateView = false, onUpdateView = null) => {
  return {
    type: GET_PROSPECT_INFO,
    payload: {
      prospectId,
      isUpdateView,
      onUpdateView
    }
  };
};
