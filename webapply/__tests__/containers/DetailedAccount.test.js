import React from "react";
import { render } from "@testing-library/react";
import { DetailedAccount as DetailedAccountContainer } from "../../src/containers/DetailedAccount/DetailedAccount";
import { DetailedAccountComponent } from "../../src/containers/DetailedAccount/components/DetailedAccount";
import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";

import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useAccountTypeByPathname");
jest.mock("../../src/containers/DetailedAccount/components/DetailedAccount");

const accountType = "some accountType";
const isIslamicBanking = true;

describe("DetailedAccount test", () => {
  beforeAll(() => {
    useFormNavigation.mockReturnValue(null);
    useAccountTypeByPathname.mockReturnValue({ accountType, isIslamicBanking });
    DetailedAccountComponent.mockReturnValue(null);

    render(<DetailedAccountContainer />);
  });

  it("should call useFormNavigation", () => {
    expect(useFormNavigation).toBeCalledWith([true, false]);
  });

  it("should render DetailedAccountComponent", () => {
    expect(DetailedAccountComponent.mock.calls[0][0]).toMatchObject({
      accountType
    });
  });
});
