import React from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

import { MyApplications } from "../../../src/containers/MyApplications/MyApplications";
import { MyApplications as MyApplicationsComponent } from "../../../src/containers/MyApplications/components/MyApplications";
import { getApplicantInfo } from "../../../src/store/selectors/appConfig";
import {
  getIsLoadingSearchProspects,
  getSearchResults
} from "../../../src/store/selectors/searchProspect";
import { getLoadingProspectId } from "../../../src/store/selectors/retrieveApplicantInfo";
import { searchApplications } from "../../../src/store/actions/searchProspect";
import { getProspectInfoPromisify } from "../../../src/store/actions/retrieveApplicantInfo";
import { useDisplayScreenBasedOnViewId } from "../../../src/utils/useDisplayScreenBasedOnViewId";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/selectors/searchProspect");
jest.mock("../../../src/store/selectors/retrieveApplicantInfo");
jest.mock("../../../src/utils/useDisplayScreenBasedOnViewId");
jest.mock("../../../src/store/actions/searchProspect");
jest.mock("../../../src/store/actions/retrieveApplicantInfo");
jest.mock("../../../src/containers/MyApplications/components/MyApplications");

describe("MyApplications test", () => {
  const prospectId = "some prospectId";
  const prospect = "some prospect";
  const inputParams = "some input params";
  const isLoading = "some boolean";
  const loadingProspectId = "some prospect id";
  const searchResults = "some search results";

  const searchAction = { type: "search action" };
  const getProspectInfoAction = { type: "get prospect info action" };

  const pushDisplayScreenToHistory = jest.fn();
  const state = "some state";
  const mockStore = configureStore([thunk]);
  const store = mockStore(state);

  beforeAll(() => {
    getApplicantInfo.mockReturnValue(inputParams);
    useDisplayScreenBasedOnViewId.mockReturnValue({
      pushDisplayScreenToHistory
    });
    getProspectInfoPromisify.mockReturnValue(dispatch => {
      dispatch(getProspectInfoAction);

      return Promise.resolve(prospect);
    });
    MyApplicationsComponent.mockReturnValue(null);
    searchApplications.mockReturnValue(searchAction);
    getIsLoadingSearchProspects.mockReturnValue(isLoading);
    getSearchResults.mockReturnValue(searchResults);
    getLoadingProspectId.mockReturnValue(loadingProspectId);

    render(
      <Provider store={store}>
        <MyApplications />
      </Provider>
    );
  });

  afterEach(() => {
    store.clearActions();
    getProspectInfoPromisify.mockClear();
    pushDisplayScreenToHistory.mockClear();
  });

  it("should dispatch searchApplications action when component mount", () => {
    expect(searchApplications).toBeCalledWith(inputParams);
    expect(store.getActions()).toEqual([searchAction]);
  });

  it("should call `getIsLoadingSearchProspects` selector", () => {
    expect(getIsLoadingSearchProspects).toBeCalledWith(state);
  });

  it("should call `getSearchResults` selector", () => {
    expect(getSearchResults).toBeCalledWith(state);
  });

  it("should call `getLoadingProspectId` selector", () => {
    expect(getLoadingProspectId).toBeCalledWith(state);
  });

  it("should call pushDisplayScreenToHistory with prospectId", async () => {
    await act(async () => {
      await MyApplicationsComponent.mock.calls[0][0].getProspectInfo(prospectId);
    });

    expect(getProspectInfoPromisify).toBeCalledWith(prospectId);
    expect(pushDisplayScreenToHistory).toBeCalledWith(prospect);
    expect(store.getActions()).toEqual([getProspectInfoAction]);
  });

  it("should do nothing when getProspectInfo failed", async () => {
    getProspectInfoPromisify.mockReturnValue(dispatch => {
      dispatch(getProspectInfoAction);

      return Promise.reject();
    });

    await act(async () => {
      await MyApplicationsComponent.mock.calls[0][0].getProspectInfo(prospectId);
    });

    expect(getProspectInfoPromisify).toBeCalledWith(prospectId);
    expect(pushDisplayScreenToHistory).not.toBeCalled();
    expect(store.getActions()).toEqual([getProspectInfoAction]);
  });

  it("should pass props", () => {
    expect(MyApplicationsComponent.mock.calls[0][0]).toMatchObject({
      isLoading,
      loadingProspectId,
      searchResults
    });
  });
});
