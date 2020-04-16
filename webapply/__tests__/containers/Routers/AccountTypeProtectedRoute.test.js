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
    const Component = jest.fn().mockImplementation(() => "some_content");
    const props = {
      ...baseProps,
      component: Component,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    const { container } = render(
      <Router history={history}>
        <AccountTypeProtectedRoute {...props} />
      </Router>
    );

    expect(container.innerHTML).toMatch("some_content");
  });

  it("should render roote when render function passed instead component", () => {
    const props = {
      ...baseProps,
      computedMatch: { params: { accountType: RAKSTARTER_ROUTE_PARAM } }
    };

    const { container } = render(
      <Router history={history}>
        <AccountTypeProtectedRoute {...props} />
      </Router>
    );

    expect(container.innerHTML).toMatch(rootPath);
    expect(history.location.pathname).toMatch(rootPath);
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
