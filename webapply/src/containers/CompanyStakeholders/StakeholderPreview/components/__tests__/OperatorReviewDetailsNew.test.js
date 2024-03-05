import React from "react";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { mockStore } from "../../../../../testUtils";
import { OperatorReviewDetails } from "../OperatorReviewDetailsNew";

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

describe("OperatorReviewDetails", () => {
  const store = {
    ...mockStore,
    appConfig: {
      prospect: {
        signatoryInfo: [
          {
            editedFullName: "John Doe",
            firstName: "John",
            middleName: "Doe",
            lastName: "",
            fullName: "",
            mothersMaidenName: "Mariyamm Babu",
            countryofBirth: "IN",
            kycDetails: {
              nationality: "",
              dateOfBirth: "",
              passportDetails: [
                {
                  passportNumber: "",
                  passportExpiryDate: "",
                  passportIssueDate: ""
                }
              ],
              emirateIdDetails: {
                eidNumber: "784",
                eidExpiryDt: ""
              }
            }
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
    isEditable: true,
    customerData: {},
    signatoryDetails: [
      { editedFullName: "John Doe", firstName: "John", middleName: "Doe", lastName: "" }
    ],
    onClickNextSubmit: jest.fn()
  };

  const initialValues = {
    fullName: "",
    firstName: "John",
    middleName: "Doe",
    lastName: "Smith",
    mothersMaidenName: "",
    nationality: "",
    dateOfBirth: "",
    eidNumber: "",
    eidExpiryDt: "",
    passportNumber: "",
    passportIssueDate: "",
    passportExpiryDate: ""
  };

  const renderComponent = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={initialValues}>
          <OperatorReviewDetails {...props} />
        </Formik>
      </Provider>
    );

  it("should render OperatorReviewDetails component", async () => {
    const { getByTestId, getByText } = renderComponent();
    const operatorReviewDetails = getByTestId("operatorReviewForm");
    expect(operatorReviewDetails).toBeTruthy();
    expect(getByText("Full name")).toBeTruthy();
    expect(getByText("First name")).toBeTruthy();
    expect(getByText("Middle name")).toBeTruthy();
    expect(getByText("Last name")).toBeTruthy();
    expect(getByText("Country of birth")).toBeTruthy();
    expect(getByText("Mother's maiden name")).toBeTruthy();
    expect(getByText("Nationality")).toBeTruthy();
    expect(getByText("Date of birth")).toBeTruthy();
    expect(getByText("Emirates ID")).toBeTruthy();
    expect(getByText("Emirates ID expiry")).toBeTruthy();
    expect(getByText("Passport issue")).toBeTruthy();
    expect(getByText("Passport expiry")).toBeTruthy();
    expect(getByTestId("fullName")).toHaveProperty("value", "John Doe");
  });

  it("should check the format for date fields", async () => {
    const { getByTestId } = renderComponent();
    const dateOfBirth = getByTestId("dateOfBirth");
    act(() => {
      fireEvent.change(dateOfBirth, { target: { value: "01/01/1990" } });
    });
    expect(dateOfBirth).toHaveProperty("value", "01/01/1990");
  });

  it("should call handleChange function on change on first name, last name, middle name fields", async () => {
    const props = {
      ...defaultProps,
      values: {
        ...defaultProps.values,
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        fullName: "John Doe"
      }
    };
    const { getByTestId } = renderComponent(props);
    const firstName = getByTestId("firstName");
    const middleName = getByTestId("middleName");
    const lastName = getByTestId("lastName");
    const fullName = getByTestId("fullName");
    expect(fullName).toHaveProperty("value", "John Doe");

    fireEvent.change(firstName, { target: { value: "Joe", name: "firstName" } });
    fireEvent.blur(firstName);
    fireEvent.change(middleName, { target: { value: "Don" } });
    fireEvent.blur(middleName);
    fireEvent.change(lastName, { target: { value: "Smith" } });
    fireEvent.blur(lastName);

    await waitFor(() => {
      expect(firstName).toHaveProperty("value", "Joe");
      expect(fullName).toHaveProperty("value", "Joe Don Smith");
    });
  });

  it("should render emirated id field", async () => {
    const { getByTestId } = renderComponent();
    const emiratesId = getByTestId("emirateIdField");
    expect(emiratesId).toBeTruthy();
    const emiratesIdInput = emiratesId.querySelector("input");
    act(() => {
      fireEvent.change(emiratesIdInput, { target: { value: "123" } });
    });
  });

  it("should call onClickNextSubmit on click of next button", async () => {
    const { getByTestId } = renderComponent();
    const form = getByTestId("operatorReviewDetailForm");
    act(() => {
      fireEvent.submit(form);
    });
  });
});
