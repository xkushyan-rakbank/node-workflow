import React from "react";
import { useLocation } from "react-router-dom";
import { render } from "@testing-library/react";

import { FormLayoutContainer } from "../../../src/containers/FormLayout/FormLayout";
import { FormLayoutComponent } from "../../../src/containers/FormLayout/components/FormLayoutComponent";
import { getErrorScreensIcons } from "../../../src/utils/getErrorScreenIcons/getErrorScreenIcons";

jest.mock("../../../src/store/actions/appConfig");
jest.mock("../../../src/containers/FormLayout/components/FormLayoutComponent");
jest.mock("../../../src/utils/getErrorScreenIcons/getErrorScreenIcons");
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn()
}));

describe("FormLayout tests", () => {
  const pathname = "some pathname";
  const children = "some children";
  const screeningError = { error: "some screening error" };
  const accountType = "some account type";
  const isIslamicBanking = true;
  const errorCode = "some error code";
  const errorIcon = "some error icon";
  let windowSpy;

  const props = {
    children,
    screeningError,
    accountType,
    isIslamicBanking,
    errorCode
  };

  beforeEach(() => {
    jest.clearAllMocks();
    FormLayoutComponent.mockImplementation(() => null);
    useLocation.mockReturnValue({ pathname });
    windowSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    getErrorScreensIcons.mockReturnValue(errorIcon);
  });

  it("should render component", () => {
    render(<FormLayoutContainer {...props} />);

    expect(FormLayoutComponent.mock.calls[0][0]).toEqual({
      children,
      errorCode,
      errorIcon,
      pathname,
      screeningError
    });
  });

  it("should scroll To 0, 0 on mount", () => {
    render(<FormLayoutContainer {...props} />);

    expect(windowSpy.mock.calls[0]).toEqual([0, 0]);
  });
});
