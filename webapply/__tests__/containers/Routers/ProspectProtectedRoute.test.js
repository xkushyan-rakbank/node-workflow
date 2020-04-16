import React from "react";

import { ProspectProtectedRoute } from "../../../src/containers/Routers";
import routes from "../../../src/routes";
import { getProspectId } from "../../../src/store/selectors/appConfig";
import { checkLoginStatus } from "../../../src/store/selectors/loginSelector";
import { renderWithProviders } from "../../../src/testUtils";

jest.mock("../../../src/store/selectors/appConfig");
jest.mock("../../../src/store/selectors/loginSelector");

describe("ProspectProtectedRoute test", () => {
  const routeRender = jest.fn().mockImplementation(() => null);

  const baseProps = { render: routeRender };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render route when component passed and auth checks were passed", () => {
    getProspectId.mockReturnValue(true);
    checkLoginStatus.mockReturnValue(true);
    const Component = jest.fn().mockImplementation(() => null);
    const props = {
      ...baseProps,
      component: Component
    };

    renderWithProviders(<ProspectProtectedRoute {...props} />);

    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should render route when render function passed instead component", () => {
    getProspectId.mockReturnValue(true);
    checkLoginStatus.mockReturnValue(true);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<ProspectProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch("/");
    expect(routeRender).toHaveBeenCalledWith(
      expect.objectContaining({
        history: expect.any(Object),
        match: expect.any(Object),
        location: expect.any(Object)
      })
    );
  });

  it("should redirect to comebackLogin page when user is customer", () => {
    getProspectId.mockReturnValue(false);
    checkLoginStatus.mockReturnValue(false);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<ProspectProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch(routes.comeBackLogin);
  });

  it("should redirect to login page when user is agent", () => {
    getProspectId.mockReturnValue(false);
    checkLoginStatus.mockReturnValue(true);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<ProspectProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch(routes.login);
  });
});
