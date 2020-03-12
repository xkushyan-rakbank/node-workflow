import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";

export const SET_ERROR_OCCURRED_WHILE_PERFORMING = "SET_ERROR_OCCURRED_WHILE_PERFORMING";
export const SEARCH_APPLICATIONS_REQUEST = "SEARCH_APPLICATIONS";
export const SEARCH_APPLICATIONS_SUCCESS = "SEARCH_APPLICATIONS_SUCCESS";
export const SEARCH_APPLICATIONS_FAILURE = "SEARCH_APPLICATIONS_FAILURE";
export const IS_APPLY_EDIT_APPLICATION = "IS_APPLY_EDIT_APPLICATION";
export const IS_LOCK_STATUS_BY_RO_AGENT = "IS_LOCK_STATUS_BY_RO_AGENT";
export const GET_PROSPECT_OVERVIEW_REQUEST = "GET_PROSPECT_OVERVIEW_REQUEST";
export const GET_PROSPECT_OVERVIEW_SUCCESS = "GET_PROSPECT_OVERVIEW_SUCCESS";
export const GET_PROSPECT_OVERVIEW_FAIL = "GET_PROSPECT_OVERVIEW_FAIL";

export const searchApplications = payload => {
  return { type: SEARCH_APPLICATIONS_REQUEST, payload };
};

export const searchApplicationsSuccess = payload => {
  return { type: SEARCH_APPLICATIONS_SUCCESS, payload };
};

export const searchApplicationsFailure = () => {
  return {
    type: SEARCH_APPLICATIONS_FAILURE
  };
};

export const setIsApplyEditApplication = payload => {
  return { type: IS_APPLY_EDIT_APPLICATION, payload };
};

export const setLockStatusByROAgent = payload => {
  return { type: IS_LOCK_STATUS_BY_RO_AGENT, payload };
};

export const setErrorOccurredWhilePerforming = payload => {
  return { type: SET_ERROR_OCCURRED_WHILE_PERFORMING, payload };
};

export const getProspectOverviewPromisify = prospectId => {
  return {
    type: GET_PROSPECT_OVERVIEW_REQUEST,
    [WAIT_FOR_ACTION]: GET_PROSPECT_OVERVIEW_SUCCESS,
    [ERROR_ACTION]: GET_PROSPECT_OVERVIEW_FAIL,
    payload: {
      prospectId
    }
  };
};

export const getProspectOverviewSuccess = prospect => {
  return { type: GET_PROSPECT_OVERVIEW_SUCCESS, payload: { prospect } };
};

export const getProspectOverviewFail = error => {
  return { type: GET_PROSPECT_OVERVIEW_FAIL, error };
};
