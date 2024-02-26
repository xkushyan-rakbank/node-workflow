import React from "react";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";
import { render, screen, fireEvent, within, waitFor } from "@testing-library/react";
import { mockStore } from "../../../../testUtils";
import { AuthorisationPreferences } from "../AuthorisationPreferencesNew";

jest.mock("../../../../components/Accordion/CustomAccordion", () => ({
  Accordion: jest.fn().mockImplementation(() => null)
}));

describe("AuthorisationPreferences", () => {
  const store = {
    ...mockStore,
    appConfig: {
      prospect: {
        accountInfo: {
          signingPreferences: "singly",
          debitCardApplied: "",
          chequeBookApplied: "",
          eStatements: true,
          mailStatements: false
        },
        signatoryInfo: [
          {
            debitCardInfo: {
              authSignatoryDetails: {
                nameOnDebitCard: ""
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

  const accountServiceChangeHandler = jest.fn();
  const radioChangeHandler = jest.fn();

  const defaultProps = {
    values: {
      signingPreferences: "singly",
      chequeBookApplied: false,
      nameOnChequeBook: "",
      debitCardApplied: false,
      nameOnDebitCard: "",
      statementsVia: false
    },
    radioChangeHandler,
    accountServiceChangeHandler,
    openDebitCardPriceGuideDialogOnClick: jest.fn(),
    isChqbookNameFieldEditable: false
  };

  const renderComp = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={props.values}>
          <AuthorisationPreferences {...props} />
        </Formik>
      </Provider>
    );

  it("should render AuthorisationPreferences component", async () => {
    const { getByTestId } = renderComp();
    const authorisationPreferencesSection = getByTestId("authorisationPreferencesSection");
    expect(authorisationPreferencesSection).toBeTruthy();
  });

  it("should call radioChangeHandler on change", async () => {
    const { getByTestId } = renderComp();
    const companyChequebookContainer = getByTestId("companyChequebookContainer");
    const radioButtons = within(companyChequebookContainer).getByTestId("Yes");
    const radioInput = radioButtons.querySelector("input");
    const chequeBookNameField = within(companyChequebookContainer).queryByTestId(
      "chequeBookNameField"
    );
    expect(chequeBookNameField).not.toBeTruthy();
    act(() => {
      fireEvent.change(radioInput, { target: { checked: true } });
    });

    await waitFor(() => {
      expect(radioInput).toHaveProperty("checked", true);
    });
  });

  it("should call accountServiceChangeHandler on change", async () => {
    const setFieldValue = jest.fn();
    const mockFunction = jest.fn((field, value) => {
      setFieldValue(field, value);
    });
    const props = {
      ...defaultProps,
      values: { statementsVia: false },
      accountServiceChangeHandler: mockFunction
    };

    renderComp(props);

    const radioButton = screen.getByRole("radio", { name: "Yes, let’s go green (free)" });
    act(() => {
      fireEvent.click(radioButton);
    });

    mockFunction("statementsVia", true);
  });

  it("should change the color of the radio button when statementsVia is true", () => {
    const props = {
      ...defaultProps,
      statementsViaRadioColor: "primary"
    };
    renderComp(props);

    let statementsViaContainer = screen.getByTestId("statementsViaContainer");
    let radioButtons = within(statementsViaContainer).getByTestId("Yes");
    expect(radioButtons.classList.contains("MuiRadio-colorPrimary")).toBe(true);
  });

  it("should call openDebitCardPriceGuideDialogOnClick on click", async () => {
    const props = {
      ...defaultProps,
      values: { ...defaultProps.values, debitCardApplied: true }
    };
    renderComp(props);
    const debitCardPriceGuide = screen.getByTestId("debitCardPriceGuideLink");
    expect(debitCardPriceGuide).toBeTruthy();
    fireEvent.click(debitCardPriceGuide);
    expect(defaultProps.openDebitCardPriceGuideDialogOnClick).toHaveBeenCalled();
  });

  it("should render company cheque book name field", async () => {
    const props = {
      ...defaultProps,
      values: { ...defaultProps.values, chequeBookApplied: true }
    };
    renderComp(props);
    const chequeBookNameField = screen.getByTestId("chequeBookNameField");
    expect(chequeBookNameField).toBeTruthy();
  });

  it("should show validation error if company cheque book name field is empty or length greater than 50", async () => {
    const props = {
      ...defaultProps,
      values: { ...defaultProps.values, chequeBookApplied: true, nameOnChequeBook: "" }
    };
    renderComp(props);
    const chequeBookNameField = screen.getByTestId("chequeBookNameField");
    expect(chequeBookNameField).toHaveProperty("disabled", false);
    act(() => {
      fireEvent.change(chequeBookNameField, { target: { value: " " } });
    });
  });

  it("should disable company cheque book name field if isChqbookNameFieldEditable prop is false", async () => {
    const props = {
      ...defaultProps,
      isChqbookNameFieldEditable: true,
      values: {
        ...defaultProps.values,
        chequeBookApplied: true,
        nameOnChequeBook: "Testing Company LLC"
      }
    };
    const { getByTestId } = renderComp(props);
    expect(getByTestId("chequeBookNameField")).toHaveProperty("disabled", true);
  });
});
