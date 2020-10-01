import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { ApplicationOverview } from "../../src/containers/ApplicationOverview/ApplicationOverview";
import { ApplicationOverviewComponent } from "../../src/containers/ApplicationOverview/components/ApplicationOverviewComponent";
import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { removeProspectId, setProspectLead } from "../../src/store/actions/appConfig";

jest.mock("../../src/utils/useAccountTypeByPathname");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/ApplicationOverview/components/ApplicationOverviewComponent");
jest.mock("../../src/store/actions/appConfig");
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({})
}));

describe("ApplicationOverview tests", () => {
  const mockStore = configureStore([]);
  const store = mockStore({});
  const removeProspectIdAction = { type: "remove prospect id" };
  const setProspectLeadAction = { type: "set prospect id" };

  beforeAll(() => {
    ApplicationOverviewComponent.mockReturnValue(null);
    removeProspectId.mockReturnValue(removeProspectIdAction);
    setProspectLead.mockReturnValue(setProspectLeadAction);

    render(
      <Provider store={store}>
        <ApplicationOverview />
      </Provider>
    );
  });

  it("should call `useAccountTypeByPathname` hook", () => {
    expect(useAccountTypeByPathname).toBeCalled();
  });

  it("should call `useFormNavigation` hook", () => {
    expect(useFormNavigation).toBeCalledWith([true, false]);
  });

  // it("should dispatch removeProspectId action on mount", () => {
  //   expect(store.getActions()).toEqual([removeProspectIdAction]);
  // });
});
