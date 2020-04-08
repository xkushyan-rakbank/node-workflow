import React from "react";
import { render } from "@testing-library/react";

import { OTPform } from "../../src/components/OTPform";
import {
  useFormNavigation,
  FormNavigationContext
} from "../../src/components/FormNavigation/FormNavigationProvider";
import { FormConfirm } from "../../src/containers/FormConfirm/FormConfirm";
import { formStepper } from "../../src/constants";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/components/OTPform");

describe("FormConfirm tests", () => {
  const contextValue = [false, false, formStepper];
  const props = "some props";

  const ContainerWithContext = props => (
    <FormNavigationContext.Provider value={contextValue}>
      <FormConfirm>
        <OTPform {...props} />
      </FormConfirm>
    </FormNavigationContext.Provider>
  );

  beforeEach(() => {
    useFormNavigation.mockReturnValue(null);
    jest.clearAllMocks();
  });

  it("should useFormNavigation", () => {
    render(<ContainerWithContext {...props} />);

    expect(useFormNavigation.mock.calls[0][0]).toEqual(contextValue);
  });
});
