import React from "react";
import { useLocation } from "react-router-dom";
import { render } from "@testing-library/react";

import { FormLayoutContainer } from "../../src/containers/FormLayout/FormLayout";
import { FormLayoutComponent } from "../../src/containers/FormLayout/components/FormLayoutComponent";
import { VIEW_IDS } from "../../src/constants";
import routes from "../../src/routes";

jest.mock("../../src/store/actions/appConfig");
jest.mock("../../src/containers/FormLayout/components/FormLayoutComponent");
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn()
}));

describe("FormLayout tests", () => {
  const pathname = "some pathname";
  const children = "some children";
  const screeningError = { error: "some screening error" };
  const updateViewId = jest.fn();
  const accountType = "some account type";
  const isIslamicBanking = true;
  const errorCode = "some error code";
  let windowSpy;

  const props = {
    children,
    screeningError,
    updateViewId,
    accountType,
    isIslamicBanking,
    errorCode
  };

  beforeEach(() => {
    FormLayoutComponent.mockImplementation(() => null);
    useLocation.mockReturnValue({ pathname });
    windowSpy = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("should pass children", () => {
    render(<FormLayoutContainer {...props} />);

    expect(FormLayoutComponent.mock.calls[0][0].children).toEqual(children);
  });

  it("should display screening error", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });

    render(<FormLayoutContainer {...props} />);

    expect(FormLayoutComponent.mock.calls[0][0].isDisplayScreeningError).toEqual(true);
  });

  it("should not display header", () => {
    render(<FormLayoutContainer {...props} />);

    expect(FormLayoutComponent.mock.calls[0][0].isDisplayHeader).toEqual(false);
  });

  it("should display header", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });

    render(<FormLayoutContainer {...props} />);

    expect(FormLayoutComponent.mock.calls[0][0].isDisplayHeader).toEqual(true);
  });

  it("should updateViewId on mount", () => {
    updateViewId.mockReturnValue(null);

    render(<FormLayoutContainer {...props} />);

    expect(updateViewId.mock.calls[0]).toEqual([pathname, false]);
  });

  it("should updateViewId and sendToApi on mount", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });
    updateViewId.mockReturnValue(null);

    render(<FormLayoutContainer {...props} />);

    expect(updateViewId.mock.calls[0]).toEqual([VIEW_IDS.CompanyInfo, true]);
  });

  it("should scroll To 0, 0 on mount", () => {
    render(<FormLayoutContainer {...props} />);

    expect(windowSpy.mock.calls[0]).toEqual([0, 0]);
  });
});
