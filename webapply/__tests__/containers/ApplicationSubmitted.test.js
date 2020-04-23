import React from "react";
import { render } from "@testing-library/react";

import { ApplicationSubmittedContainer } from "../../src/containers/ApplicationSubmitted/ApplicationSubmitted";
import { ApplicationSubmittedComponent } from "../../src/containers/ApplicationSubmitted/components/ApplicationSubmitted";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { useViewId } from "../../src/utils/useViewId";
import { formStepper } from "../../src/constants";

jest.mock("../../src/containers/ApplicationSubmitted/components/ApplicationSubmitted");
jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useViewId");

describe("FormLayout tests", () => {
  const accountNumbers = "some account numbers";
  const companyName = "some company name";

  const props = {
    accountNumbers,
    companyName
  };

  beforeEach(() => {
    ApplicationSubmittedComponent.mockImplementation(() => null);
    useFormNavigation.mockImplementation(() => {});
    useViewId.mockImplementation(() => {});

    jest.clearAllMocks();
  });

  it("should pass all props", () => {
    render(<ApplicationSubmittedContainer {...props} />);

    expect(ApplicationSubmittedComponent).toHaveBeenCalledTimes(1);
    expect(ApplicationSubmittedComponent.mock.calls[0][0]).toEqual(props);
  });

  it("should call `useFormNavigation` hook", () => {
    render(<ApplicationSubmittedContainer {...props} />);

    expect(useFormNavigation).toHaveBeenCalledWith([true, true, formStepper]);
  });

  it("should call `useViewId` hook", () => {
    render(<ApplicationSubmittedContainer {...props} />);

    expect(useViewId).toHaveBeenCalledWith();
  });
});
