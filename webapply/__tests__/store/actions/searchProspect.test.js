import { WAIT_FOR_ACTION, ERROR_ACTION } from "redux-wait-for-action";
import {
  SET_ERROR_OCCURRED_WHILE_PERFORMING,
  SEARCH_APPLICATIONS_REQUEST,
  SEARCH_APPLICATIONS_SUCCESS,
  SEARCH_APPLICATIONS_FAILURE,
  IS_APPLY_EDIT_APPLICATION,
  GET_PROSPECT_OVERVIEW_REQUEST,
  GET_PROSPECT_OVERVIEW_SUCCESS,
  GET_PROSPECT_OVERVIEW_FAIL,
  searchApplications,
  searchApplicationsSuccess,
  searchApplicationsFailure,
  setIsApplyEditApplication,
  setErrorOccurredWhilePerforming,
  getProspectOverviewPromisify,
  getProspectOverviewSuccess,
  getProspectOverviewFail
} from "../../../src/store/actions/searchProspect";

describe("actions for searchProspect", () => {
  it("should create an action to search applications request", () => {
    const payload = {};
    const expectedAction = { type: SEARCH_APPLICATIONS_REQUEST, payload };
    expect(searchApplications(payload)).toEqual(expectedAction);
  });

  it("should create an action to search applications success", () => {
    const payload = [];
    const expectedAction = { type: SEARCH_APPLICATIONS_SUCCESS, payload };
    expect(searchApplicationsSuccess(payload)).toEqual(expectedAction);
  });

  it("should create an action to screen prospect failure", () => {
    const expectedAction = { type: SEARCH_APPLICATIONS_FAILURE };
    expect(searchApplicationsFailure()).toEqual(expectedAction);
  });

  it("should create an action to set is apply of edit application", () => {
    const payload = true;
    const expectedAction = { type: IS_APPLY_EDIT_APPLICATION, payload };
    expect(setIsApplyEditApplication(payload)).toEqual(expectedAction);
  });

  it("should create an action to set error occurred while performing", () => {
    const payload = {};
    const expectedAction = { type: SET_ERROR_OCCURRED_WHILE_PERFORMING, payload };
    expect(setErrorOccurredWhilePerforming(payload)).toEqual(expectedAction);
  });

  it("should create an action to get prospect overview promisify", () => {
    const prospectId = "12345";
    const expectedAction = {
      type: GET_PROSPECT_OVERVIEW_REQUEST,
      [WAIT_FOR_ACTION]: GET_PROSPECT_OVERVIEW_SUCCESS,
      [ERROR_ACTION]: GET_PROSPECT_OVERVIEW_FAIL,
      payload: { prospectId }
    };
    expect(getProspectOverviewPromisify(prospectId)).toEqual(expectedAction);
  });

  it("should create an action to get prospect overview success", () => {
    const prospect = {};
    const expectedAction = { type: GET_PROSPECT_OVERVIEW_SUCCESS, payload: { prospect } };
    expect(getProspectOverviewSuccess(prospect)).toEqual(expectedAction);
  });

  it("should create an action to get prospect overview fail", () => {
    const error = {};
    const expectedAction = { type: GET_PROSPECT_OVERVIEW_FAIL, error };
    expect(getProspectOverviewFail(error)).toEqual(expectedAction);
  });
});
