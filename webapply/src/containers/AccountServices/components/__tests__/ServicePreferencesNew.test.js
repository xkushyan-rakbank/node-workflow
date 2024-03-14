import React from "react";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, fireEvent, within, screen } from "@testing-library/react";

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

  it("should display hide recieve interest field based for islamic banking", () => {
    renderComp({ ...defaultProps, isIslamic: true });
    const receiveInterestWrapper = screen.queryByTestId("receiveInterestFieldWrapper");
    expect(receiveInterestWrapper).toBeFalsy();
  });

  it("should display hide recieve interest field based for islamic banking", () => {
    renderComp({ ...defaultProps, isIslamic: false });
    const receiveInterestWrapper = screen.queryByTestId("receiveInterestFieldWrapper");
    expect(receiveInterestWrapper).toBeTruthy();
  });

  it("should call handleReceiveInterestChange when receive interest field is changed", () => {
    const { getByTestId } = renderComp({ ...defaultProps, isIslamic: false });
    const receiveInterestWrapper = getByTestId("receiveInterestFieldWrapper");
    const radioButtons = within(receiveInterestWrapper).getByTestId("Yes");
    const radioInput = radioButtons.querySelector("input");
    act(() => {
      fireEvent.click(radioInput);
      fireEvent.change(radioInput, { target: { checked: true } });
    });
    expect(radioInput).toHaveProperty("checked", true);
  });
});
