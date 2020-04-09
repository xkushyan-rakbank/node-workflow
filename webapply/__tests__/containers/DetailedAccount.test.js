import React from "react";
import { render } from "@testing-library/react";
import { DetailedAccount as DetailedAccountContainer } from "../../src/containers/DetailedAccount/DetailedAccount";
import { DetailedAccountComponent } from "../../src/containers/DetailedAccount/components/DetailedAccount";
import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";

import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { VerticalPaginationContext } from "../../src/components/VerticalPagination";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useAccountTypeByPathname");
jest.mock("../../src/containers/DetailedAccount/components/DetailedAccount");

describe("DetailedAccount test", () => {
  const accountType = "some accountType";
  const isIslamicBanking = "some bool";
  const setCurrentSection = jest.fn();
  const contextvalue = { setCurrentSection };

  beforeAll(() => {
    useFormNavigation.mockReturnValue(null);
    useAccountTypeByPathname.mockReturnValue({ accountType, isIslamicBanking });
    DetailedAccountComponent.mockReturnValue(null);

    render(
      <VerticalPaginationContext.Provider value={contextvalue}>
        <DetailedAccountContainer />
      </VerticalPaginationContext.Provider>
    );
  });

  it("should call useFormNavigation hook", () => {
    expect(useFormNavigation).toBeCalledWith([true, false]);
  });

  it("should call useAccountTypeByPathname hook", () => {
    expect(useAccountTypeByPathname).toBeCalled();
  });

  it("should render DetailedAccountComponent", () => {
    expect(DetailedAccountComponent.mock.calls[0][0]).toEqual({
      accountType,
      isIslamicBanking,
      setCurrentSection
    });
  });
});
