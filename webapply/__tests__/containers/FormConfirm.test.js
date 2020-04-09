import React from "react";
import { render } from "@testing-library/react";

import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { FormConfirm } from "../../src/containers/FormConfirm/components/FormConfirm";
import { FormConfirmPage } from "../../src/containers/FormConfirm/FormConfirmPage";
import { formStepper } from "../../src/constants";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/containers/FormConfirm/components/FormConfirm");

describe("FormConfirm test", () => {
  beforeAll(() => {
    useFormNavigation.mockReturnValue(null);
    FormConfirm.mockReturnValue(null);

    render(<FormConfirmPage />);
  });

  it("should call useFormNavigation hook", () => {
    expect(useFormNavigation).toBeCalledWith([false, false, formStepper]);
  });

  it("should render FormConfirm component", () => {
    expect(FormConfirm.mock.calls[0][0]).toEqual({});
  });
});
