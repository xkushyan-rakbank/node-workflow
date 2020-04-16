import React from "react";

import { AgentProtectedRoute } from "../../../src/containers/Routers/AgentProtectedRoute";
import routes from "../../../src/routes";
import { checkLoginStatus } from "../../../src/store/selectors/loginSelector";
import { getAuthToken } from "../../../src/store/selectors/appConfig";
import { renderWithProviders } from "../../../src/testUtils";

jest.mock("../../../src/store/selectors/loginSelector");
jest.mock("../../../src/store/selectors/appConfig");

describe("AgentProtectedRoute test", () => {
  const routeRender = jest.fn().mockImplementation(() => null);

  const baseProps = { render: routeRender };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render route when component passed and auth checks were passed", () => {
    checkLoginStatus.mockReturnValue(true);
    getAuthToken.mockReturnValue(true);
    const Component = jest.fn().mockImplementation(() => null);
    const props = {
      ...baseProps,
      component: Component
    };

    renderWithProviders(<AgentProtectedRoute {...props} />);

    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should render route when render function passed instead component", () => {
    checkLoginStatus.mockReturnValue(true);
    getAuthToken.mockReturnValue(true);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<AgentProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch("/");
    expect(routeRender).toHaveBeenCalledWith(
      expect.objectContaining({
        history: expect.any(Object),
        match: expect.any(Object),
        location: expect.any(Object)
      })
    );
  });

  it("should redirect to login page when auth checks weren't passed", () => {
    checkLoginStatus.mockReturnValue(false);
    getAuthToken.mockReturnValue(false);
    const props = { ...baseProps };

    const { history } = renderWithProviders(<AgentProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch(routes.login);
  });
});
