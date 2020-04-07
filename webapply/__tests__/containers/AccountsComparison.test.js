import React from "react";
import { render, act } from "@testing-library/react";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { AccountsComparisonComponent } from "../../src/containers/AccountsComparison/components/AccountsComparison/AccountsComparison";
import { AccountsComparisonContainer } from "../../src/containers/AccountsComparison/AccountsComparison";
import { VerticalPaginationContext } from "../../src/components/VerticalPagination";
import { accountTypes } from "../../src/containers/AccountsComparison/components/TableCompare/constants";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock(
  "../../src/containers/AccountsComparison/components/AccountsComparison/AccountsComparison"
);

describe("AccountsComparison container tests", () => {
  const accountType = "some account type";
  const servicePricingGuideUrl = "some url";
  const props = { servicePricingGuideUrl };
  const currentSectionIndex = 1;
  const setCurrentSection = jest.fn();

  const ContainerWithContext = props => (
    <VerticalPaginationContext.Provider value={{ currentSectionIndex, setCurrentSection }}>
      <AccountsComparisonContainer {...props} />
    </VerticalPaginationContext.Provider>
  );

  beforeEach(() => {
    useFormNavigation.mockImplementation(() => {});
    AccountsComparisonComponent.mockImplementation(() => null);

    jest.clearAllMocks();
  });

  it("should pass url", () => {
    render(<ContainerWithContext {...props} />);
    expect(AccountsComparisonComponent.mock.calls[0][0]).toMatchObject({
      setCurrentSection,
      servicePricingGuideUrl,
      selectedAccount: accountTypes.starter.name
    });
  });

  it("should use useFormNavigation", () => {
    render(<ContainerWithContext {...props} />);

    expect(useFormNavigation.mock.calls[0][0]).toEqual([true, false, [], true]);
  });

  it("should change selectedAccount", async () => {
    render(<ContainerWithContext {...props} />);

    await act(async () => {
      AccountsComparisonComponent.mock.calls[0][0].handleSetAccountType(accountType);
    });

    expect(setCurrentSection.mock.calls[0]).toEqual([2]);
    expect(AccountsComparisonComponent.mock.calls[1][0]).toMatchObject({
      setCurrentSection,
      servicePricingGuideUrl,
      selectedAccount: accountType
    });
  });
});
