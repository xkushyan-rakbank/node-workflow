import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";

export const SET_ERROR_OCCURRED_WHILE_PERFORMING = "SET_ERROR_OCCURRED_WHILE_PERFORMING";
export const SEARCH_APPLICATIONS_REQUEST = "SEARCH_APPLICATIONS";
export const SEARCH_APPLICATIONS_SUCCESS = "SEARCH_APPLICATIONS_SUCCESS";
export const SEARCH_APPLICATIONS_FAILURE = "SEARCH_APPLICATIONS_FAILURE";
export const IS_APPLY_EDIT_APPLICATION = "IS_APPLY_EDIT_APPLICATION";
export const GET_PROSPECT_OVERVIEW_REQUEST = "GET_PROSPECT_OVERVIEW_REQUEST";
export const GET_PROSPECT_OVERVIEW_SUCCESS = "GET_PROSPECT_OVERVIEW_SUCCESS";
export const GET_PROSPECT_OVERVIEW_FAIL = "GET_PROSPECT_OVERVIEW_FAIL";

export const searchApplications = data => ({
  type: SEARCH_APPLICATIONS_REQUEST,
  payload: data
});

export const searchApplicationsSuccess = data => ({
  type: SEARCH_APPLICATIONS_SUCCESS,
  payload: data
});

export const searchApplicationsFailure = () => ({
  type: SEARCH_APPLICATIONS_FAILURE
});

export const setIsApplyEditApplication = isApplyEditApplication => ({
  type: IS_APPLY_EDIT_APPLICATION,
  payload: isApplyEditApplication
});

export const setErrorOccurredWhilePerforming = error => ({
  type: SET_ERROR_OCCURRED_WHILE_PERFORMING,
  payload: error
});

export const getProspectOverviewPromisify = prospectId => ({
  type: GET_PROSPECT_OVERVIEW_REQUEST,
  [WAIT_FOR_ACTION]: GET_PROSPECT_OVERVIEW_SUCCESS,
  [ERROR_ACTION]: GET_PROSPECT_OVERVIEW_FAIL,
  payload: {
    prospectId
  }
});

export const getProspectOverviewSuccess = prospect => ({
  type: GET_PROSPECT_OVERVIEW_SUCCESS,
  payload: { prospect }
});

export const getProspectOverviewFail = error => ({
  type: GET_PROSPECT_OVERVIEW_FAIL,
  error
});
