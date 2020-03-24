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
  it("SEARCH_APPLICATIONS_REQUEST action type", () => {
    const expectedState = {
      ...initialState,
      isSearchLoading: true
    };
    expect(reducer(initialState, searchApplications())).toStrictEqual(expectedState);
  });

  it("SEARCH_APPLICATIONS_SUCCESS action type", () => {
    const searchResults = [1, 2];
    const expectedState = {
      ...initialState,
      searchResults,
      isSearchLoading: false
    };
    expect(reducer(initialState, searchApplicationsSuccess(searchResults))).toStrictEqual(
      expectedState
    );
  });

  it("SEARCH_APPLICATIONS_SUCCESS action type with undefined payload", () => {
    expect(reducer(initialState, searchApplicationsSuccess(undefined)).searchResults).toStrictEqual([]);
  });

  it("SEARCH_APPLICATIONS_FAILURE action type", () => {
    const searchResults = [1, 2];
    const updatedState = {
      ...initialState,
      searchResults,
      isSearchLoading: false
    };
    expect(reducer(updatedState, searchApplicationsFailure(searchResults))).toStrictEqual(
      initialState
    );
  });

  it("IS_APPLY_EDIT_APPLICATION action type", () => {
    const expectedState = {
      ...initialState,
      isApplyEditApplication: true
    };
    expect(reducer(initialState, setIsApplyEditApplication(true))).toStrictEqual(expectedState);
  });

  it("SET_ERROR_OCCURRED_WHILE_PERFORMING action type", () => {
    const payload = {
      errorCode: 500
    };
    const expectedState = {
      ...initialState,
      errorCode: payload.errorCode
    };
    expect(reducer(initialState, setErrorOccurredWhilePerforming(payload))).toStrictEqual(
      expectedState
    );
  });

  it("GET_PROSPECT_OVERVIEW_SUCCESS action type", () => {
    const prospect = {}
    const expectedState = {
      ...initialState,
      prospectOverview: prospect
    };
    expect(reducer(initialState, getProspectOverviewSuccess(prospect))).toStrictEqual(
      expectedState
    );
  });

  it("LOGOUT action type", () => {
    const updatedState = {};
    expect(reducer(updatedState, logout())).toStrictEqual(initialState);
  });
});
