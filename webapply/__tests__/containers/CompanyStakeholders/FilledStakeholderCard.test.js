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
import { changeEditableStakeholder } from "../../../src/store/actions/stakeholders";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/actions/stakeholders");
jest.mock("../../../src/utils/getAuthoroityTypeDisplayText");
jest.mock(
  "../../../src/containers/CompanyStakeholders/components/FilledStakeholderCard/FilledStakeholderCard",
  () => ({
    FilledStakeholderCardComponent: jest.fn().mockImplementation(() => null)
  })
);

describe("FilledStakeholderCard container tests", () => {
  const accountSigningInfo = "some info";
  const index = 2;
  const shareHoldingPercentage = "some percentage";
  const kycDetails = { shareHoldingPercentage };
  const isEditDisabled = true;
  const stakeholderId = "some id";
  const props = {
    accountSigningInfo,
    index,
    kycDetails,
    isEditDisabled,
    stakeholderId
  };
  const datalist = "some datalist";
  const mockStore = configureStore([thunk]);
  const store = mockStore({});
  const firstName = "some name";
  const middleName = "some name";
  const lastName = "some name";
  const stakeholdersNamesContextValue = [{ id: stakeholderId, firstName, middleName, lastName }];
  const authorityTypeDisplayText = "some text";

  const changeEditableStakeholderAction = { type: "some action" };
  changeEditableStakeholder.mockReturnValue(changeEditableStakeholderAction);
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
    expect(store.getActions()).toEqual([changeEditableStakeholderAction]);
  });
});
