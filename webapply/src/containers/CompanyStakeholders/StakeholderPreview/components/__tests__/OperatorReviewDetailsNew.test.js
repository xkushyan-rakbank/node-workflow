import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
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
  const mockStore = configureStore([]);
  const store = mockStore({
    appConfig: {
      prospect: {
        signatoryInfo: [
          {
            editedFullName: "",
            firstName: "",
            middleName: "",
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
    },
    serverValidation: {
      inputs: {}
    },
    inputFieldBehaviours: {
      "prospect.prospectDocuments.companyDocument.tradeLicenseOrCOI": {
        visible: true,
        enabled: true
      },
      "prospect.organizationInfo.countryOfIncorporation": {
        visible: true,
        enabled: false
      },
      "prospect.organizationInfo.licenseOrCOIExpiryDate": {
        visible: true,
        enabled: true
      },
      "prospect.prospectDocuments.companyDocument.moa": {
        visible: false,
        enabled: true
      },
      "prospect.companyAdditionalInfo.topCustomers[0].name": {
        visible: true,
        enabled: true,
        label: ""
      },
      "prospect.companyAdditionalInfo.topCustomers[0].country": {
        visible: true,
        enabled: true,
        label: ""
      },
      "prospect.companyAdditionalInfo.topSuppliers.title": {
        visible: true,
        enabled: true,
        label: ""
      },
      "prospect.companyAdditionalInfo.topCustomers.title": {
        visible: true,
        enabled: true,
        label: ""
      },
      "prospect.companyAdditionalInfo.dnfbpField": {
        visible: false,
        enabled: true
      },
      "prospect.companyAdditionalInfo.topSuppliers[0].name": {
        visible: true
      },
      "prospect.companyAdditionalInfo.topSuppliers[0].country": {
        visible: true
      },
      "prospect.companyAdditionalInfo.isFinancialInstitution": {
        visible: false
      },
      "prospect.companyAdditionalInfo.globalintermediaryId": {
        visible: false
      },
      "prospect.companyAdditionalInfo.isNonFinancialInstitution": {
        visible: true
      }
    },
    decisions: {
      decisionLoading: {}
    }
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    isEditable: true,
    customerData: {},
    signatoryDetails: [{ firstName: "John", middleName: "Doe", lastName: "" }],
    onClickNextSubmit: jest.fn()
  };

  const initialValues = {
    fullName: "",
    firstName: "John",
    middleName: "Doe",
    lastName: "",
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
    const { getByTestId } = renderComponent();
    const lastName = getByTestId("lastName");
    const fullName = getByTestId("fullName");
    fireEvent.blur(lastName, { target: { value: "Smith" } });
    expect(lastName).toHaveProperty("value", "Smith");
    expect(fullName).toHaveProperty("value", "Smith");
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
