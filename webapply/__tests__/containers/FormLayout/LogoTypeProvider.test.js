import React, { useContext } from "react";
import { Provider } from "react-redux";
import { render, act } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import {
  useLogoType,
  LogoTypeProvider,
  LogoTypeContext
} from "../../../src/containers/FormLayout/LogoTypeProvider";
import { LOGO_ELITE, LOGO_STANDART, LOGO_ELITE_ISLAMIC, LOGO_ISLAMIC } from "../../../src/components/Header/constants";
import { getIsIslamicBanking, getAccountType } from "../../../src/store/selectors/appConfig";
import { accountNames } from "../../../src/constants";

jest.mock("../../../src/store/selectors/appConfig");

describe("LayoutProvider tests", () => {
  const history = createMemoryHistory();
  const state = "some state";
  const store = configureStore([])(state);
  const setSavedContext = jest.fn();
  const TestComponent = () => {
    useLogoType(LOGO_ELITE);

    return null;
  };
  const TestConsumer = () => {
    setSavedContext(useContext(LogoTypeContext));

    return null;
  };
  const Providers = ({ children }) => (
    <Router history={history}>
      <Provider store={store}>
        <LogoTypeProvider>{children}</LogoTypeProvider>
      </Provider>
    </Router>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    getIsIslamicBanking.mockReturnValue(false);
    getAccountType.mockReturnValue(accountNames.starter);
  });

  it("should render component", () => {
    render(
      <Providers>
        <TestConsumer />
        <TestComponent />
      </Providers>
    );

    expect(getIsIslamicBanking).toBeCalledWith(state);
    expect(getAccountType).toBeCalledWith(state);

    expect(setSavedContext).toBeCalledTimes(2);
    expect(setSavedContext).nthCalledWith(1, LOGO_STANDART);
    expect(setSavedContext).nthCalledWith(2, LOGO_ELITE);

    act(() => {
      history.push("/somepage");
    });

    expect(setSavedContext).nthCalledWith(3, LOGO_STANDART);
  });

  it("should set logo type as `LOGO_ELITE_ISLAMIC` when account type is elite and islamic", () => {
    getIsIslamicBanking.mockReturnValue(true);
    getAccountType.mockReturnValue(accountNames.elite);

    render(
      <Providers>
        <TestConsumer />
      </Providers>
    );

    expect(getIsIslamicBanking).toBeCalledWith(state);
    expect(getAccountType).toBeCalledWith(state);

    expect(setSavedContext).toBeCalledWith(LOGO_ELITE_ISLAMIC);
  });

  it("should set logo type as `LOGO_ELITE` when account type is elite", () => {
    getAccountType.mockReturnValue(accountNames.elite);

    render(
      <Providers>
        <TestConsumer />
      </Providers>
    );

    expect(getIsIslamicBanking).toBeCalledWith(state);
    expect(getAccountType).toBeCalledWith(state);

    expect(setSavedContext).toBeCalledWith(LOGO_ELITE);
  });

  it("should set logo type as `LOGO_ISLAMIC` when account type is islamic", () => {
    getIsIslamicBanking.mockReturnValue(true);

    render(
      <Providers>
        <TestConsumer />
      </Providers>
    );

    expect(getIsIslamicBanking).toBeCalledWith(state);
    expect(getAccountType).toBeCalledWith(state);

    expect(setSavedContext).toBeCalledWith(LOGO_ISLAMIC);
  });
});
