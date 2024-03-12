import React from "react";
import { render } from "@testing-library/react";
import { Formik } from "formik";

import { EmiratesID } from "../EmiratesID";

describe("EmiratesID", () => {
  const onBlurMock = jest.fn();
  const setFieldValue = jest.fn();
  const form = {
    setFieldValue
  };
  const defaultInputProps = {};

  const renderComp = (props = defaultInputProps, defaultValue = "") =>
    render(
      <Formik
        initialValues={{
          eid: defaultValue
        }}
      >
        <EmiratesID
          data-testid="eid"
          name="eid"
          value={defaultValue}
          form={{ errors: props.errors, touched: props.touched, ...form }}
          field={{ onBlur: onBlurMock, name: "test", value: defaultValue }}
        />
      </Formik>
    );
  it("renders the component correctly", () => {
    const { getByTestId } = renderComp();
    const inputElement = getByTestId("eid");
    expect(inputElement).toBeTruthy();
  });

  it("accepts valid input", () => {
    const { getByTestId } = renderComp({}, "784-1234-5647890-1");
    const inputElement = getByTestId("eid");
    const input = inputElement.querySelector("input");
    expect(input).toHaveProperty("value", "784-1234-5647890-1");
  });

  it("does not accept invalid input", () => {
    const errors = { test: "Error" };
    const touched = { test: true };
    const { getByTestId } = renderComp({ errors, touched }, "xxxx");
    const inputElement = getByTestId("eid");
    const input = inputElement.querySelector("input");
    expect(input).toHaveProperty("value", "784-");
  });
});
