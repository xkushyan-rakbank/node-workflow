import React from "react";
import { useLocation } from "react-router-dom";
import { shallow } from "enzyme";

import { FormLayoutContainer } from "../../src/containers/FormLayout/FormLayout";
import routes from "../../src/routes";
import { VIEW_IDS } from "../../src/constants";

jest.mock("../../src/store/actions/appConfig");
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

  const props = {
    children,
    screeningError,
    updateViewId,
    accountType,
    isIslamicBanking,
    errorCode
  };

  const mountContainerAndCheckProps = () => {
    const container = shallow(<FormLayoutContainer {...props} />);
    const component = container.find("FormLayoutComponent");
    return component.props();
  };

  beforeEach(() => {
    useLocation.mockReturnValue({ pathname });

    jest.clearAllMocks();
  });

  it("should pass children", () => {
    const componentProps = mountContainerAndCheckProps();

    expect(componentProps.children).toEqual(children);
  });

  it("should display screening error", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });

    const componentProps = mountContainerAndCheckProps();

    expect(componentProps.isDisplayScreeningError).toEqual(true);
  });

  it("should not display header", () => {
    const componentProps = mountContainerAndCheckProps();

    expect(componentProps.isDisplayHeader).toEqual(false);
  });

  it("should display header", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });

    const componentProps = mountContainerAndCheckProps();

    expect(componentProps.isDisplayHeader).toEqual(true);
  });

  it("should updateViewId on mount", () => {
    updateViewId.mockReturnValue(null);

    jest.spyOn(React, "useEffect").mockImplementation(f => f());

    mountContainerAndCheckProps();

    expect(updateViewId.mock.calls[0]).toEqual([pathname, false]);
  });

  it("should updateViewId and sendToApi on mount", () => {
    const pathname = routes.companyInfo;
    useLocation.mockReturnValue({ pathname });
    updateViewId.mockReturnValue(null);
    jest.spyOn(React, "useEffect").mockImplementation(f => f());

    mountContainerAndCheckProps();

    expect(updateViewId.mock.calls[0]).toEqual([VIEW_IDS.CompanyInfo, true]);
  });
});
