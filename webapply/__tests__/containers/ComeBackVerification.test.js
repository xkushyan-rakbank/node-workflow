import React from "react";
import { render } from "@testing-library/react";
import { ComeBackVerification } from "../../src/containers/ComeBackVerification/ComeBackVerification";
import { ComeBackVerificationComponent } from "../../src/containers/ComeBackVerification/components/ComeBackVerification";

import {
  useFormNavigation,
} from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/ComeBackVerification/components/ComeBackVerification");

describe("ComeBackVerification test", () => {
  const contextValue = [true, false];
  const redirectRoute = routes.MyApplications;

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    ComeBackVerificationComponent.mockImplementation(() => null);

    jest.clearAllMocks();
  });

  it("should useFormNavigation", () => {
    useFormNavigation.mockReturnValue(null);
    render(<ComeBackVerification  />);

    expect(useFormNavigation.mock.calls[0][0]).toEqual(contextValue);
  });

  it("should useFormNavigation", () => {

    render(<ComeBackVerification  />);
    expect(ComeBackVerificationComponent.mock.calls[0][0].redirectRoute).toBe(redirectRoute);
  });

});
