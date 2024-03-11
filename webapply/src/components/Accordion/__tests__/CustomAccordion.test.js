import React from "react";
import * as reactRedux from "react-redux";
import { Provider } from "react-redux";
import { Formik } from "formik";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Accordion } from "../CustomAccordion.js";
import { mockStore } from "../../../testUtils";

describe("CustomAccordion", () => {
  const store = {
    ...mockStore
  };

  const defaultProps = {
    id: "accordion",
    title: "Accordion Title",
    children: "Accordion Children",
    showDefinition: "",
    isCompleted: false,
    subTitle: "",
    showHelperText: false,
    expandedByDefault: false,
    expandedDescription: ""
  };

  const renderedComponent = (props = defaultProps) =>
    render(
      <Provider store={store}>
        <Formik initialValues={props.values}>
          <Accordion {...props} />
        </Formik>
      </Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the Accordion component", () => {
    renderedComponent();
    expect(screen.getByTestId("accordion")).toBeTruthy();
  });

  it("should render the title", () => {
    renderedComponent();
    expect(screen.getByTestId("accordion-title")).toBeTruthy();
    expect(screen.getByText(defaultProps.title)).toBeTruthy();
  });

  it("should render the children", () => {
    renderedComponent();
    expect(screen.getByTestId("accordion-details")).toBeTruthy();
    expect(screen.getByText(defaultProps.children)).toBeTruthy();
  });

  it("should handle expand and collapse", async () => {
    renderedComponent();
    const accordion = screen.getByTestId("accordion");
    expect(accordion.classList.contains("Mui-expanded")).toBe(false);

    fireEvent.click(screen.getByText(defaultProps.title));
    await waitFor(() => expect(accordion.classList.contains("Mui-expanded")).toBe(true));

    fireEvent.click(screen.getByText(defaultProps.title));
    await waitFor(() => expect(accordion.classList.contains("Mui-expanded")).toBe(false));
  });

  it("should be expanded by default if id is in byDefaultExpandedAccordion", () => {
    const props = {
      ...defaultProps,
      id: "documentLanding"
    };
    renderedComponent(props);
    const accordion = screen.getByTestId("accordion");
    expect(accordion.classList.contains("Mui-expanded")).toBe(true);
  });

  it("should show expandedDescription if id is in expandedDescriptionView and expanded", async () => {
    const props = {
      ...defaultProps,
      id: "isSelectPackage",
      expandedDescription: "Expanded Description"
    };
    renderedComponent(props);
    fireEvent.click(screen.getByText(defaultProps.title));
    await waitFor(() => expect(screen.getByText(props.expandedDescription)).toBeTruthy());
  });

  it("should display checkmark icon if isCompleted", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    useSelectorMock.mockReturnValue(
      '{"documentLanding":false,"frequently_asked_questions":false,"subCategory":["12"],"allianceCode":null,"sourcingId":"","companyAdditionalInfoStatus":"In Progress","isFinancialTurnoverCompleted":false,"isBusinessRelationshipCompleted":true}'
    );

    const props = {
      ...defaultProps,
      id: "isBusinessRelationshipCompleted",
      isCompleted: true
    };
    renderedComponent(props);
    expect(screen.queryByTestId("accordion-completed-status")).toBeTruthy();
  });

  it("should not display checkmark icon if not isCompleted", () => {
    const props = {
      ...defaultProps,
      id: "isBusinessRelationshipCompleted",
      isCompleted: false
    };
    renderedComponent(props);
    expect(screen.queryByTestId("accordion-completed-status")).toBeFalsy();
  });

  it("should show subTitle if provided", () => {
    const props = {
      ...defaultProps,
      subTitle: "Sub Title"
    };
    renderedComponent(props);
    expect(screen.getByText(props.subTitle)).toBeTruthy();
  });

  it("should show helper text if provided", () => {
    const props = {
      ...defaultProps,
      showHelperText: "Helper Text"
    };
    renderedComponent(props);
    expect(screen.getByTestId("accordion-help")).toBeTruthy();
  });

  it("should show definition if provided", () => {
    const props = {
      ...defaultProps,
      id: "isTaxDeclarationCompleted",
      showDefinition: "Definition"
    };
    renderedComponent(props);
    fireEvent.click(screen.getByText(defaultProps.title));
    expect(screen.getByText(props.showDefinition)).toBeTruthy();
  });
});
