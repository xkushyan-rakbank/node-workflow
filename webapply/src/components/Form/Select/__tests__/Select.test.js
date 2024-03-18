import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { CustomSelect } from "../Select";

describe("CustomSelect", () => {
  const options = [
    { key: "1", value: "Option 1", label: "Option 1" },
    { key: "2", value: "Option 2", label: "Option 2" },
    { key: "3", value: "Option 3", label: "Option 3" }
  ];

  const renderComponent = (props = {}) => {
    const formProps = {
      errors: {},
      touched: {},
      setFieldTouched: props.setFieldTouched,
      setFieldValue: () => {}
    };
    return render(
      <CustomSelect
        options={props.options || options}
        label={props.label || "Select an option"}
        form={props.form || formProps}
        field={props.field || { name: "test" }}
        infoTitle={props.infoTitle}
        multiple={props.multiple}
      />
    );
  };

  it("renders without errors", () => {
    const { getByTestId } = renderComponent();
    const select = getByTestId("custom-select");
    expect(select).toBeTruthy();
  });

  it("displays the correct label", () => {
    const label = "Select an option";
    const { getByText } = renderComponent({ label });
    const select = getByText(label);
    expect(select).toBeTruthy();
  });

  it("renders error message when there is an error", () => {
    const errorMessage = "This is an error";
    const { getByText } = renderComponent({
      form: {
        errors: { test: errorMessage },
        touched: { test: true }
      }
    });
    const error = getByText(errorMessage);
    expect(error).toBeTruthy();
  });

  it("renders infoTitle when it is passed", () => {
    const infoTitle = "This is an info title";
    const { getByText } = renderComponent({ infoTitle });
    const info = getByText(infoTitle);
    expect(info).toBeTruthy();
  });

  it("it shows renderValue correctly when multiple is true", () => {
    const { getByTestId } = renderComponent({
      multiple: true,
      field: { value: ["Option 1", "Option 2"], name: "test" }
    });
    const selectInputContainer = getByTestId("custom-select");
    const selectInput = selectInputContainer.querySelector("input");
    fireEvent.change(selectInput, { target: { value: ["Option 1, Option 2"] } });

    expect(selectInput).toHaveProperty("value", "Option 1,Option 2");
  });

  it("it shows renderValue correctly when multiple is false", () => {
    const { getByTestId } = renderComponent({
      multiple: false,
      field: { value: ["Option 1"], name: "test" }
    });
    const selectInputContainer = getByTestId("custom-select");
    const selectInput = selectInputContainer.querySelector("input");

    expect(selectInput).toHaveProperty("value", "Option 1");
  });

  it("renders when options are empty", () => {
    const { getByTestId } = render(
      <CustomSelect
        label="Select an option"
        form={{ errors: {}, touched: {} }}
        field={{ name: "test" }}
      />
    );
    const select = getByTestId("custom-select");
    expect(select).toBeTruthy();
  });
});
