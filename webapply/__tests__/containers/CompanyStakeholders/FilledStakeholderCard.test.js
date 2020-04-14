import React from "react";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import { getDatalist } from "../../../src/store/selectors/appConfig";
import { FilledStakeholderCardComponent } from "../../../src/containers/CompanyStakeholders/components/FilledStakeholderCard/FilledStakeholderCard";
import { StakeholdersNamesContext } from "../../../src/containers/CompanyStakeholders/components/StakeholdersNameProvider/StakeholdersNameProvider";
import { getAuthorityTypeDisplayText } from "../../../src/utils/getAuthoroityTypeDisplayText";
import { FilledStakeholderCard } from "../../../src/containers/CompanyStakeholders/FilledStakeholderCard";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/utils/getAuthoroityTypeDisplayText");
jest.mock(
  "../../../src/containers/CompanyStakeholders/components/FilledStakeholderCard/FilledStakeholderCard",
  () => ({
    FilledStakeholderCardComponent: jest.fn().mockImplementation(() => null)
  })
);

describe("FilledStakeholderCard container tests", () => {
  const accountSigningInfo = "some info";
  const changeEditableStep = jest.fn();
  const index = 2;
  const shareHoldingPercentage = "some percentage";
  const kycDetails = { shareHoldingPercentage };
  const isEditDisabled = true;
  const id = "some id";
  const props = {
    accountSigningInfo,
    changeEditableStep,
    index,
    kycDetails,
    isEditDisabled,
    id
  };
  const datalist = "some datalist";
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  const firstName = "some name";
  const middleName = "some name";
  const lastName = "some name";
  const stakeholdersNamesContextValue = [{ id, firstName, middleName, lastName }];
  const authorityTypeDisplayText = "some text";

  getAuthorityTypeDisplayText.mockReturnValue(authorityTypeDisplayText);
  getDatalist.mockReturnValue(datalist);

  const ContainerWithProviders = props => (
    <Provider store={store}>
      <StakeholdersNamesContext.Provider value={stakeholdersNamesContextValue}>
        <FilledStakeholderCard {...props} />
      </StakeholdersNamesContext.Provider>
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should pass default props", () => {
    render(<ContainerWithProviders {...props} />);

    expect(FilledStakeholderCardComponent).toHaveBeenCalled();
    expect(FilledStakeholderCardComponent.mock.calls[0][0]).toMatchObject({
      firstName,
      lastName,
      middleName,
      isEditDisabled,
      shareHoldingPercentage,
      authorityTypeDisplayText,
      index
    });
  });

  it("should pass empty name if no info in provider", () => {
    render(
      <Provider store={store}>
        <StakeholdersNamesContext.Provider value={[]}>
          <FilledStakeholderCard {...props} />
        </StakeholdersNamesContext.Provider>
      </Provider>
    );

    expect(FilledStakeholderCardComponent).toHaveBeenCalled();
    expect(FilledStakeholderCardComponent.mock.calls[0][0]).toMatchObject({
      firstName: undefined,
      lastName: undefined,
      middleName: undefined,
      isEditDisabled,
      shareHoldingPercentage,
      authorityTypeDisplayText,
      index
    });
  });

  it("should handle editStakeholder callback", () => {
    render(<ContainerWithProviders {...props} />);

    expect(FilledStakeholderCardComponent).toHaveBeenCalled();
    FilledStakeholderCardComponent.mock.calls[0][0].editStakeholder();
    expect(changeEditableStep).toHaveBeenCalledWith(index);
  });
});
