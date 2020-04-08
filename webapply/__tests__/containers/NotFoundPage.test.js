import React from "react";
import { render, act } from "@testing-library/react";

import { NotFoundPage } from "../../src/containers/NotFoundPage/NotFoundPage";
import { NotFoundComponent } from "../../src/containers/NotFoundPage/components/NotFoundComponent";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/containers/NotFoundPage/components/NotFoundComponent");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useHistory: () => ({ push: mockPush })
}));

describe("NotFoundPage tests", () => {
  beforeEach(() => {
    NotFoundComponent.mockImplementation(() => null);
    jest.clearAllMocks();
  });

  it("should redirect to accountsComparison", () => {
    render(<NotFoundPage />);

    act(() => {
      NotFoundComponent.mock.calls[0][0].goToHomePage();
    });

    expect(NotFoundComponent).toHaveBeenCalledTimes(1);
    expect(useFormNavigation).toBeCalledWith([false, false]);
    expect(mockPush).toBeCalledWith(routes.accountsComparison);
  });
});
