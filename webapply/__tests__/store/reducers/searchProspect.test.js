import reducer, { initialState } from "../../../src/store/reducers/searchProspect";
import {
  searchApplications,
  searchApplicationsSuccess,
  searchApplicationsFailure,
  setIsApplyEditApplication,
  setErrorOccurredWhilePerforming,
  getProspectOverviewSuccess
} from "../../../src/store/actions/searchProspect";
import { logout } from "../../../src/store/actions/loginForm";

describe("searchProspect reducer test", () => {
  it("should handle SEARCH_APPLICATIONS_REQUEST action type", () => {
    expect(reducer(undefined, searchApplications())).toMatchObject({
      isSearchLoading: true,
      searchError: false,
      searchErrorDesc: []
    });
  });

  it("should handle SEARCH_APPLICATIONS_SUCCESS action type", () => {
    const searchResults = [1, 2];

    expect(reducer(undefined, searchApplicationsSuccess(searchResults))).toMatchObject({
      searchResults,
      isSearchLoading: false
    });
  });

  it("should handle SEARCH_APPLICATIONS_SUCCESS action type with undefined payload", () => {
    expect(reducer(undefined, searchApplicationsSuccess(undefined))).toHaveProperty(
      "searchResults",
      []
    );
  });

  it("should handle SEARCH_APPLICATIONS_FAILURE action type", () => {
    expect(reducer(undefined, searchApplicationsFailure({}))).toMatchObject({
      isSearchLoading: false
    });
  });

  it("should handle SEARCH_APPLICATIONS_FAILURE action type with error description", () => {
    expect(reducer(undefined, searchApplicationsFailure({errorType:"Others", errors:[1,2]}))).toMatchObject({
      searchError: true,
      searchErrorDesc: [1,2]
    });
  });

  it("should handle IS_APPLY_EDIT_APPLICATION action type", () => {
    expect(reducer(undefined, setIsApplyEditApplication(true))).toMatchObject({
      isApplyEditApplication: true
    });
  });

  it("should handle SET_ERROR_OCCURRED_WHILE_PERFORMING action type", () => {
    const error = { errorCode: 500 };

    expect(reducer(undefined, setErrorOccurredWhilePerforming(error))).toHaveProperty(
      "errorCode",
      500
    );
  });

  it("should handle GET_PROSPECT_OVERVIEW_SUCCESS action type", () => {
    const prospect = {};

    expect(reducer(undefined, getProspectOverviewSuccess(prospect))).toMatchObject({
      prospectOverview: prospect
    });
  });

  it("should handle LOGOUT action type", () => {
    expect(reducer({}, logout())).toStrictEqual(initialState);
  });
});
