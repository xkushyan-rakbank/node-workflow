import React from "react";
import { render } from "@testing-library/react";

import { ComeBackVerification } from "../../src/containers/ComeBackVerification/ComeBackVerification";
import { ComeBackVerificationComponent } from "../../src/containers/ComeBackVerification/components/ComeBackVerification";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/ComeBackVerification/components/ComeBackVerification");

describe("ComeBackVerification test", () => {
  beforeAll(() => {
    useFormNavigation.mockReturnValue(null);
    ComeBackVerificationComponent.mockReturnValue(null);

    render(<ComeBackVerification />);
  });

  it("should call useFormNavigation", () => {
    expect(useFormNavigation).toBeCalledWith([true, false]);
  });

  it("should render ComeBackVerificationComponent", () => {
    expect(ComeBackVerificationComponent.mock.calls[0][0]).toEqual({
      redirectRoute: routes.MyApplications
    });
  });
});
