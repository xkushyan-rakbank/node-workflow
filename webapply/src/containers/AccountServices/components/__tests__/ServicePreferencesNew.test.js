import React from "react";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, fireEvent, within, waitFor, getByText } from "@testing-library/react";
import { mockStore } from "../../../../testUtils";
import { ServicePreferences } from "../ServicePreferencesNew";

describe("ServicePreferences", () => {
  const store = {
    ...mockStore,
    appConfig: {
      prospect: {
        accountInfo: {
          accountCurrency: "AED",
          accountCurrencies: ["AED"],
          branchId: "",
          accountEmirateCity: "",
          receiveInterest: ""
        }
      }
    }
  };

  const defaultProps = {
    values: {
      accountCurrency: "AED",
      accountCurrencies: ["AED"],
      branchId: "",
      accountEmirateCity: "",
      receiveInterest: ""
    },
    setFieldValue: jest.fn(),
    isIslamic: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComp = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={props.values}>
          <ServicePreferences {...props} />
        </Formik>
      </Provider>
    );
  it("should render correctly", () => {
    const { getByTestId } = renderComp();
    expect(getByTestId("servicePreferenceWrapper")).toBeTruthy();
  });

  it("should display label for recieve interest field based on isIslamic props", () => {
    const { getByTestId } = renderComp({ ...defaultProps, isIslamic: true });
    const fieldContainer = getByTestId("receiveInterestFieldWrapper");
    expect(
      getByText(fieldContainer, "Do you want to earn profit on your account(s)?")
    ).toBeTruthy();
  });

  it("should call handleReceiveInterestChange when receive interest field is changed", () => {
    const { getByTestId } = renderComp();
    const receiveInterestWrapper = getByTestId("receiveInterestFieldWrapper");
    const radioButtons = within(receiveInterestWrapper).getByTestId("Yes");
    const radioInput = radioButtons.querySelector("input");
    act(() => {
      fireEvent.click(radioInput);
      fireEvent.change(radioInput, { target: { checked: true } });
    });
    expect(radioInput).toHaveProperty("checked", true);
  });

  it("should make AED account currency checked by default", () => {
    const { getByTestId } = renderComp();
    const accountCurrenciesWrapper = getByTestId("accountCurrenciesWrapper");
    const checkbox = within(accountCurrenciesWrapper).getByTestId("AED");
    const checkboxInput = checkbox.querySelector("input");
    expect(checkboxInput).toHaveProperty("disabled", true);
    expect(checkboxInput).toHaveProperty("checked", true);
  });

  it("should call accountCurrencyCheckboxFieldHandler when account currency checkbox is changed", async () => {
    const setFieldValue = jest.fn();
    const mockFunction = jest.fn((field, value) => {
      setFieldValue(field, value);
    });
    const { getByTestId } = renderComp();
    const accountCurrenciesWrapper = getByTestId("accountCurrenciesWrapper");
    const checkbox = within(accountCurrenciesWrapper).getByTestId("GBP");
    const checkboxInput = checkbox.querySelector("input");
    act(async () => {
      fireEvent.click(checkboxInput);
      fireEvent.change(checkboxInput, { target: { checked: true } });
    });
    mockFunction("accountCurrencies", ["AED", "GBP"]);
    await waitFor(() => {
      expect(checkboxInput).toHaveProperty("checked", true);
    });
  });
  it("should call handleConfirmRemoveCurrency when confirm button is clicked", async () => {
    const props = {
      ...defaultProps,
      values: { ...defaultProps.values, accountCurrencies: ["AED", "GBP"] }
    };
    const { getByTestId } = renderComp(props);
    const accountCurrenciesWrapper = getByTestId("accountCurrenciesWrapper");
    const checkbox = within(accountCurrenciesWrapper).getByTestId("GBP");
    const checkboxInput = checkbox.querySelector("input");
    act(() => {
      fireEvent.click(checkboxInput);
      fireEvent.change(checkboxInput, { target: { checked: false } });
    });
    const confirmModal = getByTestId("confirm-dialog");
    expect(confirmModal).toBeTruthy();
    const confirmButton = within(confirmModal).queryByTestId("confirmButton");
    act(() => {
      fireEvent.click(confirmButton);
    });
    expect(checkboxInput).toHaveProperty("checked", false);
  });
  it("should call hide confirm modal when cancel button is clicked", async () => {
    const props = {
      ...defaultProps,
      values: { ...defaultProps.values, accountCurrencies: ["AED", "GBP"] }
    };
    const { getByTestId } = renderComp(props);
    const accountCurrenciesWrapper = getByTestId("accountCurrenciesWrapper");
    const checkbox = within(accountCurrenciesWrapper).getByTestId("GBP");
    const checkboxInput = checkbox.querySelector("input");
    act(() => {
      fireEvent.click(checkboxInput);
    });
    const confirmModal = getByTestId("confirm-dialog");
    expect(confirmModal).toBeTruthy();
    const cancelButton = within(confirmModal).queryByTestId("cancelButton");
    act(() => {
      fireEvent.click(cancelButton);
    });
    expect(checkboxInput).toHaveProperty("checked", true);
  });
});
