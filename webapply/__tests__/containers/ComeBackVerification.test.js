import React from "react";
import { render } from "@testing-library/react";
import { ComeBackVerification } from "../../src/containers/ComeBackVerification/ComeBackVerification";
import { OTPform } from "../../src/components/OTPform";
import {
  useFormNavigation,
  FormNavigationContext
} from "../../src/components/FormNavigation/FormNavigationProvider";
import routes from "../../src/routes";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/components/OTPform");

describe("ComeBackVerification test", () => {
  const contextValue = [true, false];
  const redirectRoute = routes.MyApplications;
  const props = { redirectRoute };

  const ContainerWithContext = props => (
    <FormNavigationContext.Provider value={contextValue}>
      <ComeBackVerification>
        <OTPform {...props} />
      </ComeBackVerification>
    </FormNavigationContext.Provider>
  );

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it("should useFormNavigation", () => {
    useFormNavigation.mockReturnValue(null);
    render(<ContainerWithContext {...props} />);

    expect(useFormNavigation.mock.calls[0][0]).toEqual(contextValue);
  });
});
