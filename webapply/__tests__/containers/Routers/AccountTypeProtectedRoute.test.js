import React from "react";

import { renderWithProviders } from "../../../src/testUtils";
import { AccountTypeProtectedRoute } from "../../../src/containers/Routers/AccountTypeProtectedRoute";
import { RAKSTARTER_ROUTE_PARAM } from "../../../src/constants";
import routes from "../../../src/routes";

describe("AccountTypeProtectedRoute test", () => {
  const routeRender = jest.fn().mockImplementation(() => null);

  const baseProps = { render: routeRender };

  it("should render route when component passed", () => {
    const Component = jest.fn().mockImplementation(() => null);
    const props = {
      ...baseProps,
      component: Component,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    renderWithProviders(<AccountTypeProtectedRoute {...props} />);

    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should render route when render function passed instead component", () => {
    const props = {
      ...baseProps,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    const { history } = renderWithProviders(<AccountTypeProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch("/");
    expect(routeRender).toHaveBeenCalledWith(
      expect.objectContaining({
        history: expect.any(Object),
        match: expect.any(Object),
        location: expect.any(Object)
      })
    );
  });

  it("should redirect to accountsComparison page when accountType param didn't match", () => {
    const props = {
      ...baseProps,
      computedMatch: { params: { accountType: "some invalid type" } }
    };

    const { history } = renderWithProviders(<AccountTypeProtectedRoute {...props} />);

    expect(history.location.pathname).toMatch(routes.accountsComparison);
  });
});
