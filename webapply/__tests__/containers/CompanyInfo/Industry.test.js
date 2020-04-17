import React from "react";
import { render, act } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { Industry } from "../../../src/containers/CompanyInfo/Industry";
import { Industry as IndustryStep } from "../../../src/containers/CompanyInfo/components/Industry";
import { getOrgKYCDetails, getIsIslamicBanking } from "../../../src/store/selectors/appConfig";
import { updateProspect } from "../../../src/store/actions/appConfig";

jest.mock("../../../src/containers/CompanyInfo/components/Industry");
jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/actions/appConfig");

describe("Industry test", () => {
  const industries = "some industries";
  const state = "some state";
  const updateProspectAction = { type: "some action type" };
  const store = configureStore([])(state);

  const TestComponent = props => (
    <Provider store={store}>
      <Industry {...props} />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
    IndustryStep.mockReturnValue(null);
    getOrgKYCDetails.mockReturnValue({ industryMultiSelect: industries });
    getIsIslamicBanking.mockReturnValue(false);
    updateProspect.mockReturnValue(updateProspectAction);
  });

  it("should render component with prop `datalistId` equal `industry` when account type is not islamic", () => {
    getIsIslamicBanking.mockReturnValue(false);

    render(<TestComponent />);

    expect(IndustryStep.mock.calls[0][0].datalistId).toBe("industry");
    expect(getOrgKYCDetails).toBeCalledWith(state);
    expect(getIsIslamicBanking).toBeCalledWith(state);
  });

  it("should render component with prop `datalistId` equal `islamicIndustry` when account type is islamic", () => {
    getIsIslamicBanking.mockReturnValue(true);

    render(<TestComponent />);

    expect(IndustryStep.mock.calls[0][0].datalistId).toBe("islamicIndustry");
    expect(getOrgKYCDetails).toBeCalledWith(state);
    expect(getIsIslamicBanking).toBeCalledWith(state);
  });

  it("should render component with prop `industries` as empty array when `orgKYCDetails` is not exists", () => {
    getOrgKYCDetails.mockReturnValue(null);

    render(<TestComponent />);

    expect(IndustryStep.mock.calls[0][0].industries).toEqual([]);
    expect(getOrgKYCDetails).toBeCalledWith(state);
    expect(getIsIslamicBanking).toBeCalledWith(state);
  });

  it("should handle `updateProspect` action", () => {
    const values = "some values";
    render(<TestComponent />);

    act(() => {
      IndustryStep.mock.calls[0][0].updateIndustry(values)
    });

    expect(store.getActions()).toEqual([updateProspectAction]);
    expect(updateProspect).toBeCalledWith({
      "prospect.orgKYCDetails.industryMultiSelect[0]": values
    });
  });
});
