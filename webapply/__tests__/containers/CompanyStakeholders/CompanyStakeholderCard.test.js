import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { getSignatoriesCount } from "../../../src/store/selectors/appConfig";
import { StakeholdersNamesContext } from "../../../src/containers/CompanyStakeholders/components/StakeholdersNameProvider/StakeholdersNameProvider";
import { CompanyStakeholderCard } from "../../../src/containers/CompanyStakeholders/CompanyStakeholderCard";
import { CompanyStakeholderCardComponent } from "../../../src/containers/CompanyStakeholders/components/CompanyStakeholderCard/CompanyStakeholderCard";

jest.mock(
  "../../../src/containers/CompanyStakeholders/components/CompanyStakeholderCard/CompanyStakeholderCard",
  () => ({
    CompanyStakeholderCardComponent: jest.fn().mockImplementation(() => null)
  })
);
jest.mock("../../../src/store/selectors/appConfig");

describe("CompanyStakeholderCard container tests", () => {
  const stakeholderId = "some id";
  const isStatusShown = true;
  const isStatusLoading = false;
  const index = 2;
  const isEditInProgress = true;
  const editHandler = jest.fn();
  const deleteHandler = jest.fn();
  const isDisplayConfirmation = true;
  const children = "some children";
  const props = {
    stakeholderId,
    isStatusShown,
    isStatusLoading,
    index,
    isEditInProgress,
    editHandler,
    deleteHandler,
    isDisplayConfirmation,
    children
  };

  const mockStore = configureStore([thunk]);
  const store = mockStore({});

  const firstName = "some name";
  const middleName = "some name";
  const lastName = "some name";
  const stakeholdersNamesContextValue = [{ id: stakeholderId, firstName, middleName, lastName }];

  const signatoriesCount = "some number";
  getSignatoriesCount.mockReturnValue(signatoriesCount);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should pass default props", () => {
    render(
      <Provider store={store}>
        <StakeholdersNamesContext.Provider value={stakeholdersNamesContextValue}>
          <CompanyStakeholderCard {...props} />
        </StakeholdersNamesContext.Provider>
      </Provider>
    );

    expect(CompanyStakeholderCardComponent).toHaveBeenCalled();
    expect(CompanyStakeholderCardComponent.mock.calls[0][0]).toEqual({
      firstName,
      middleName,
      lastName,
      deleteHandler,
      editHandler,
      isDisplayConfirmation,
      isEditInProgress,
      isStatusLoading,
      isStatusShown,
      stakeholdersCount: signatoriesCount,
      index,
      children
    });
  });

  it("should pass empty name if no info in provider", () => {
    render(
      <Provider store={store}>
        <StakeholdersNamesContext.Provider value={[]}>
          <CompanyStakeholderCard {...props} />
        </StakeholdersNamesContext.Provider>
      </Provider>
    );

    expect(CompanyStakeholderCardComponent).toHaveBeenCalled();
    expect(CompanyStakeholderCardComponent.mock.calls[0][0]).toEqual({
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      deleteHandler,
      editHandler,
      isDisplayConfirmation,
      isEditInProgress,
      isStatusLoading,
      isStatusShown,
      stakeholdersCount: signatoriesCount,
      index,
      children
    });
  });
});
