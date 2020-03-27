import { WAIT_FOR_ACTION, ERROR_ACTION, CALLBACK_ARGUMENT } from "redux-wait-for-action";

export const RETRIEVE_APPLICANT_INFO = "RETRIEVE_APPLICANT_INFO";
export const RETRIEVE_APPLICANT_INFO_SUCCESS = "RETRIEVE_APPLICANT_INFO_SUCCESS";
export const GET_PROSPECT_INFO_REQUEST = "GET_PROSPECT_INFO_REQUEST";
export const GET_PROSPECT_INFO_SUCCESS = "GET_PROSPECT_INFO_SUCCESS";
export const GET_PROSPECT_INFO_FAIL = "GET_PROSPECT_INFO_FAIL";

export const retrieveApplicantInfo = payload => {
  return { type: RETRIEVE_APPLICANT_INFO, payload };
};

export const retrieveApplicantInfoSuccess = searchResults => {
  return { type: RETRIEVE_APPLICANT_INFO_SUCCESS, payload: searchResults };
};

export const getProspectInfoPromisify = prospectId => {
  return {
    type: GET_PROSPECT_INFO_REQUEST,
    [WAIT_FOR_ACTION]: GET_PROSPECT_INFO_SUCCESS,
    [ERROR_ACTION]: GET_PROSPECT_INFO_FAIL,
    [CALLBACK_ARGUMENT]: ({ payload: { prospect } }) => prospect,
    payload: {
      prospectId
    }
  };
};

export const getProspectInfoSuccess = prospect => {
  return { type: GET_PROSPECT_INFO_SUCCESS, payload: { prospect } };
};

export const getProspectInfoFail = error => {
  return { type: GET_PROSPECT_INFO_FAIL, error };
};
