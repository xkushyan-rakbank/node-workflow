import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { AccountTypeProtectedRoute } from "../../../src/containers/Routers/AccountTypeProtectedRoute";
import { RAKSTARTER_ROUTE_PARAM } from "../../../src/constants";
import routes from "../../../src/routes";

describe("AccountTypeProtectedRoute test", () => {
  const rootPath = "/some_path";
  const history = createMemoryHistory({ initialEntries: [rootPath] });

  const routeRender = jest.fn().mockImplementation(({ location: { pathname } }) => pathname);

  const baseProps = { render: routeRender };

  it("should render route when component passed", () => {
    const Component = jest.fn().mockImplementation(() => null);
    const props = {
      ...baseProps,
      component: Component,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    render(
      <Router history={history}>
        <AccountTypeProtectedRoute {...props} />
      </Router>
    );

    expect(Component).toHaveBeenCalledTimes(1);
  });

  it("should render roote when render function passed instead component", () => {
    const props = {
      ...baseProps,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    render(
      <Router history={history}>
        <AccountTypeProtectedRoute {...props} />
      </Router>
    );

    expect(history.location.pathname).toMatch(rootPath);
    expect(routeRender).toHaveBeenCalledWith(
      expect.objectContaining({
        history: expect.any(Object),
        match: expect.any(Object),
        location: expect.any(Object)
      })
    );
  });

  it("should redirect to accountsComparison when accountType param didn't match", () => {
    const props = {
      ...baseProps,
      computedMatch: { params: { accountType: "some invalid type" } }
    };

    render(
      <Router history={history}>
        <AccountTypeProtectedRoute {...props} />
      </Router>
    );

    expect(history.location.pathname).toMatch(routes.accountsComparison);
  });
});
