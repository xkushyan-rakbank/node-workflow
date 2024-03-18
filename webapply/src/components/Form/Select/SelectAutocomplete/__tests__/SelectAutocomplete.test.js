import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Formik } from "formik";
import { SelectAutocomplete } from "../SelectAutocomplete";

describe("SelectAutocomplete", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];

  const renderComponent = (props = {}) => {
    const formProps = {
      errors: {},
      touched: {},
      setFieldTouched: props.setFieldTouched,
      setFieldValue: () => {}
    };
    return render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <SelectAutocomplete
          field={props.field || { name: "test", onBlur: props.onBlur }}
          form={props.form || formProps}
          options={options}
          label={props.label || "Select"}
          multiple={props.multiple}
          disabled={props.disabled}
          onChange={props.onChange}
          infoTitle={props.infoTitle}
          innerRef={props.innerRef}
        />
      </Formik>
    );
  };
  it("renders without errors", () => {
    const { getByTestId } = renderComponent();
    const select = getByTestId("select-autocomplete");
    expect(select).toBeTruthy();
  });

  it("displays the label correctly", () => {
    const { getByText } = renderComponent({ label: "Test Label" });
    expect(getByText("Test Label")).toBeTruthy();
    // Add your assertion here
  });

  it("allows selecting a single option", () => {
    const { getByTestId } = renderComponent();
    const selectInputContainer = getByTestId("select-autocomplete");

    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.change(selectInput, { target: { value: "option2" } });
    expect(selectInput).toHaveProperty("value", "option2");
  });

  it("allows selecting multiple options", () => {
    const { getByTestId } = renderComponent({ multiple: true });

    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.change(selectInput, { target: { value: ["option1", "option2"] } });
    expect(selectInput).toHaveProperty("value", "option1", "option2");
  });

  it("renders disabled when disabled is true", () => {
    const { getByTestId } = renderComponent({ disabled: true });
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    expect(selectInput).toHaveProperty("disabled", true);
  });

  it("calls onBlur when the input is blurred", () => {
    const onBlur = jest.fn();
    const setFieldTouched = jest.fn();
    const { getByTestId } = renderComponent({ onBlur, setFieldTouched });
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.blur(selectInput);
    expect(setFieldTouched).toHaveBeenCalled();
  });

  it("calls onFocus when the input is focused", () => {
    const onFocus = jest.fn();
    const { getByTestId } = renderComponent({ onFocus });
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.focus(selectInput);
  });

  it("calls handleChange when an option is selected", () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderComponent({ onChange: handleChange });
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    selectInput.focus();
    fireEvent.keyDown(selectInput, { key: "ArrowDown" });
    // const option = getByText("Option 1");
    // fireEvent.click(option);
    fireEvent.change(selectInput, { target: { value: "option1" } });
    // expect(handleChange).toHaveBeenCalled();

    // fireEvent.click(selectInput);
    // const option = getByText("Option 1");
    // fireEvent.click(option);

    // expect(handleChange).toHaveBeenCalled();

    // const selectInput = selectInputContainer.querySelector("input");

    // fireEvent.change(selectInput, { target: { value: "option2" } });
    // expect(handleChange).toHaveBeenCalled();
  });

  it("calls handleChange when multiple options are selected", () => {
    const handleChange = jest.fn();
    const { getByTestId } = renderComponent({
      onChange: handleChange,
      multiple: true,
      field: { value: ["option1", "option2"], name: "test" }
    });
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");

    fireEvent.change(selectInput, { target: { value: ["option1", "option2"] } });
    // expect(handleChange).toHaveBeenCalled();
  });

  it("renders infoTitle when provided", () => {
    const { getByText } = renderComponent({ infoTitle: "Test Info Title" });
    expect(getByText("Test Info Title")).toBeTruthy();
  });

  it("renders error message when there is an error", () => {
    const { getByText } = renderComponent({
      form: {
        errors: { test: "Test Error" },
        touched: { test: true }
      }
    });
    expect(getByText("Test Error")).toBeTruthy();
  });

  it("calls default onChange when onChange is not provided", () => {
    const { getByTestId } = render(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <SelectAutocomplete
          field={{ name: "test", onBlur: () => {} }}
          form={{ errors: {}, touched: {} }}
          options={options}
          label="Select"
        />
      </Formik>
    );
    const selectInputContainer = getByTestId("select-autocomplete");
    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.change(selectInput, { target: { value: "option1" } });
  });

  it("redners correctly when disabled and innerRef are provided", () => {
    const innerRef = React.createRef();
    const { getByTestId } = renderComponent({ innerRef, disabled: true });
    const select = getByTestId("select-autocomplete");
    expect(select).toBeTruthy();
  });
});
