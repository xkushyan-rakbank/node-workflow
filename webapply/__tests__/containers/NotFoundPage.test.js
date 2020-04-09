import React from "react";
import { render, act } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import { NotFoundPage } from "../../src/containers/NotFoundPage/NotFoundPage";
import { NotFoundComponent } from "../../src/containers/NotFoundPage/components/NotFoundComponent";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/containers/NotFoundPage/components/NotFoundComponent");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");

describe("NotFoundPage tests", () => {
  const history = createMemoryHistory();

  beforeAll(() => {
    NotFoundComponent.mockImplementation(() => null);
  });

  it("should redirect to accountsComparison", () => {
    render(
      <Router history={history}>
        <NotFoundPage />
      </Router>
    );

    expect(NotFoundComponent).toHaveBeenCalledTimes(1);
    expect(useFormNavigation).toBeCalledWith([false, false]);

    act(() => {
      NotFoundComponent.mock.calls[0][0].goToHomePage();
    });

    expect(history.location.pathname).toBe(routes.accountsComparison);
  });
});
