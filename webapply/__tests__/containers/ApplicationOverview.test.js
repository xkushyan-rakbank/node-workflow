import React from "react";
import { render } from "@testing-library/react";

import { ApplicationOverview } from "../../src/containers/ApplicationOverview/ApplicationOverview";
import { ApplicationOverviewComponent } from "../../src/containers/ApplicationOverview/components/ApplicationOverviewComponent";
import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { removeProspectId } from "../../src/store/actions/appConfig";

jest.mock("../../src/utils/useAccountTypeByPathname");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/store/actions/appConfig");
jest.mock("../../src/containers/ApplicationOverview/components/ApplicationOverviewComponent");

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  __esModule: true,
  useDispatch: () => mockDispatch,
  connect: () => () => {}
}));

describe("ApplicationOverview tests", () => {
  beforeEach(() => {
    ApplicationOverviewComponent.mockImplementation(() => null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call useAccountTypeByPathname and useFormNavigation on render", () => {
    render(<ApplicationOverview />);
    expect(useAccountTypeByPathname).toBeCalled();
    expect(useFormNavigation).toBeCalledWith([true, false]);
  });

  it("should dispatch removeProspectId action on mount", () => {
    render(<ApplicationOverview />);
    expect(mockDispatch).toBeCalled();
    expect(removeProspectId).toBeCalled();
  });
});
