import React from "react";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { DetailedAccount as DetailedAccountContainer } from "../../src/containers/DetailedAccount/DetailedAccount";
import { DetailedAccountComponent } from "../../src/containers/DetailedAccount/components/DetailedAccount";

import { useAccountTypeByPathname } from "../../src/utils/useAccountTypeByPathname";
import { getAccountType } from "../../src/store/selectors/appConfig";
import { useFormNavigation } from "../../src/components/FormNavigation/FormNavigationProvider";
import { VerticalPaginationContext } from "../../src/components/VerticalPagination";

jest.mock("../../src/components/FormNavigation/FormNavigationProvider");
jest.mock("../../src/utils/useAccountTypeByPathname");
jest.mock("../../src/store/selectors/appConfig");
jest.mock("../../src/containers/DetailedAccount/components/DetailedAccount");

describe("DetailedAccount test", () => {
  const accountType = "some accountType";
  const selectedAccountType = "some selected account type";
  const isIslamicBanking = "some bool";
  const setCurrentSection = jest.fn();
  const contextValue = { setCurrentSection };
  const mockStore = configureStore([]);
  const store = mockStore({});

  beforeAll(() => {
    useFormNavigation.mockReturnValue(null);
    useAccountTypeByPathname.mockReturnValue({ accountType, isIslamicBanking });
    DetailedAccountComponent.mockReturnValue(null);
    getAccountType.mockReturnValue(selectedAccountType);

    render(
      <Provider store={store}>
        <VerticalPaginationContext.Provider value={contextValue}>
          <DetailedAccountContainer />
        </VerticalPaginationContext.Provider>
      </Provider>

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
      setCurrentSection,
      selectedAccountType
    });
  });
});
