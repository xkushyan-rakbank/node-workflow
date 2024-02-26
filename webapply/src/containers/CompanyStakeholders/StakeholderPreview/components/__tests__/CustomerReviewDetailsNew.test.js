import React from "react";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";

import { mockStore } from "../../../../../testUtils";
import { CustomerReviewDetails } from "../CustomerReviewDetailsNew";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useLocation: jest.fn().mockReturnValue({})
}));

jest.mock("../../../../../components/Buttons/BackLink", () => ({
  BackLink: jest.fn().mockImplementation(() => null)
}));

jest.mock("../../../../../components/Buttons/NextStepButton", () => ({
  NextStepButton: jest.fn().mockImplementation(() => null)
}));

describe("CustomerReviewDetailsNew", () => {
  const store = {
    ...mockStore,
    appConfig: {
      prospect: {
        signatoryInfo: [
          {
            mothersMaidenName: "Mariyamm Babu",
            countryofBirth: "IN"
          }
        ]
      }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    customerData: {
      signatoryFullName: "Testing User",
      signatoryNationality: "Nationality",
      dateOfBirth: "01/01/1990",
      eidNumber: "123456789",
      eidExpiryDt: "01/01/2025",
      passportNumber: "123456789",
      passportExpiryDate: "01/01/2025"
    },
    onClickNextSubmit: jest.fn(),
    values: {
      questionInput: "",
      mothersMaidenName: "",
      countryofBirth: ""
    }
  };
  const renderComponent = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={props.values}>
          <CustomerReviewDetails {...props} />
        </Formik>
      </Provider>
    );
  it("should render CustomerReviewDetailsNew", () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId("customerReviewContainer")).toBeTruthy();
  });

  it("should render CustomerReviewDetailsNew with essential information", () => {
    const { getByTestId, getByText } = renderComponent();
    expect(getByTestId("essentialInformation")).toBeTruthy();
    expect(getByText("Essential information")).toBeTruthy();
    expect(getByTestId("fullName")).toBeTruthy();
  });

  it("should render formik form", () => {
    renderComponent();
    const otherInfoSection = screen.getByTestId("otherInformationForm");
    expect(within(otherInfoSection).getByText("Other information")).toBeTruthy();
  });

  it("should call radioChangeHandler on change", async () => {
    const { getByTestId } = renderComponent();
    const radioButtons = getByTestId("isEFRDataCorrect");
    let radioButton = within(radioButtons).getByTestId("Yes");
    const radioInput = radioButton.querySelector("input");
    act(() => {
      fireEvent.click(radioInput);
      fireEvent.change(radioInput, { target: { checked: true } });
    });
    await waitFor(() => {
      expect(radioInput).toHaveProperty("checked", true);
    });
  });

  it("should call onClickNextSubmit on click of next button", async () => {
    const { getByTestId } = renderComponent();
    const form = getByTestId("otherInformationForm");
    act(() => {
      fireEvent.submit(form);
    });
  });
});
