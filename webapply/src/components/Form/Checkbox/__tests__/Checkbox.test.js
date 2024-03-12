import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Formik } from "formik";

import { CheckboxBase } from "../Checkbox";

describe("CheckboxBase", () => {
  const renderComp = (props = {}) =>
    render(
      <Formik initialValues={{}}>
        <CheckboxBase
          infoTitle={props.infoTitle}
          label={props.label}
          value={props.value}
          form={{ errors: props.errors, touched: props.touched, ...props.form }}
          field={{ name: "checkbox", value: props.value }}
          onChange={props.onChange}
        />
      </Formik>
    );
  it("renders without errors", () => {
    const { getByLabelText } = renderComp({ value: true, label: "Test Checkbox" });

    const checkbox = getByLabelText("Test Checkbox");
    expect(checkbox).toBeTruthy();
  });

  it("calls onChange when checkbox is clicked", () => {
    const handleChange = jest.fn();
    const { getByLabelText } = renderComp({
      onChange: handleChange,
      value: true,
      label: "Test Checkbox"
    });

    const checkbox = getByLabelText("Test Checkbox");
    fireEvent.click(checkbox);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("displays error message when there are errors", () => {
    const { getByText } = renderComp({
      errors: { checkbox: "Checkbox is required" },
      touched: { checkbox: true }
    });
    const errorMessage = getByText("Checkbox is required");
    expect(errorMessage).toBeTruthy();
  });

  it("displays infoTitle when provided", () => {
    const { getByText } = renderComp({ infoTitle: "infoTitle", label: "Test Checkbox" });
    const infoTitle = getByText("infoTitle");
    expect(infoTitle).toBeTruthy();
  });

  it("display label when provided", () => {
    const { getByText } = renderComp({ label: "Test Checkbox" });
    const label = getByText("Test Checkbox");
    expect(label).toBeTruthy();
  });

  it("displays empty label when not provided", () => {
    const { queryByText } = renderComp();
    const label = queryByText("Test Checkbox");
    expect(label).toBeNull();
  });
});
