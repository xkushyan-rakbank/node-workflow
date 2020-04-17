import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

import { CheckList } from "../../../../src/containers/AgentPages/SearchedAppInfo/CheckList";
import { CheckList as CheckListStep } from "../../../../src/containers/AgentPages/SearchedAppInfo/components/CheckList";
import {
  getCompanyChecks,
  getOrganizationScreeningResults
} from "../../../../src/store/selectors/screeningResults";

jest.mock("../../../../src/store/selectors/screeningResults");
jest.mock("../../../../src/containers/AgentPages/SearchedAppInfo/components/CheckList");

describe("CheckList test", () => {
  const mockStore = configureStore([]);
  const state = "some state";
  const companyChecks = "some companyChecks data";
  const companyInfo = "some companyInfo data";
  const store = mockStore(state);

  const TestComponentWithProvider = () => (
    <Provider store={store}>
      <CheckList />
    </Provider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    CheckListStep.mockReturnValue(null);
    getCompanyChecks.mockReturnValue(companyChecks);
    getOrganizationScreeningResults.mockReturnValue(companyInfo);
  });

  it("should render component", () => {
    render(<TestComponentWithProvider />);

    expect(CheckListStep.mock.calls[0][0]).toEqual({
      companyChecks,
      companyInfo
    });
    expect(getCompanyChecks).toBeCalledWith(state);
    expect(getOrganizationScreeningResults).toBeCalledWith(state);
  });
});
