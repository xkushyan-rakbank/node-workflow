import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { useCheckList } from "../../../../src/containers/AgentPages/SearchedAppInfo/utils/useCheckList";
import { getFilledOverviewSignatories } from "../../../../src/store/selectors/searchProspect";
import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../src/store/selectors/screeningResults";

jest.mock("../../../../src/store/selectors/searchProspect");
jest.mock("../../../../src/store/selectors/screeningResults");

describe("useCheckList test", () => {
  const SomeComponent = jest.fn(() => null);
  const TestComponent = () => {
    const props = useCheckList();

    return <SomeComponent {...props} />;
  };
  const mockStore = configureStore([]);
  const state = "some state";
  const signatoryInfo = "some signatoryInfo data";
  const companyChecks = "some companyChecks data";
  const companyInfo = "some companyInfo data";
  const store = mockStore(state);

  const TestComponentWithProvider = () => (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    getFilledOverviewSignatories.mockReturnValue(signatoryInfo);
    getCompanyChecks.mockReturnValue(companyChecks);
    getOrganizationScreeningResults.mockReturnValue(companyInfo);
  });

  it("should return data for render test component", () => {
    render(<TestComponentWithProvider />);

    expect(SomeComponent.mock.calls[0][0]).toEqual({
      signatoryInfo,
      companyChecks,
      companyInfo
    });
    expect(getFilledOverviewSignatories).toBeCalledWith(state);
    expect(getCompanyChecks).toBeCalledWith(state);
    expect(getOrganizationScreeningResults).toBeCalledWith(state);
  });
});
