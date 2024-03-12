import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { InlineRadioGroup } from "../InlineRadioGroup";

describe("InlineRadioGroup", () => {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" }
  ];
  it("renders radio options correctly", () => {
    const { getByLabelText } = render(
      <InlineRadioGroup
        label="Radio Group"
        field={{ name: "radioGroup", value: "" }}
        form={{ touched: {}, errors: {}, setFieldValue: jest.fn() }}
        classes={{
          parent: "parentClass"
        }}
        options={options}
      />
    );

    options.forEach(option => {
      const radioOption = getByLabelText(option.label);
      expect(radioOption).toBeTruthy();
    });
  });

  it("calls onChange handler when a radio option is selected", () => {
    const onChange = jest.fn();

    const { getByLabelText } = render(
      <InlineRadioGroup
        label="Radio Group"
        field={{ name: "radioGroup", value: "" }}
        form={{ touched: {}, errors: {}, setFieldValue: jest.fn() }}
        classes={{
          parent: "parentClass"
        }}
        options={options}
        onChange={onChange}
      />
    );

    const radioOption = getByLabelText("Option 2");
    fireEvent.click(radioOption);

    expect(onChange).toHaveBeenCalled();
  });

  it("renders error message when there is an error", () => {
    const { getByText } = render(
      <InlineRadioGroup
        label="Radio Group"
        field={{ name: "radioGroup", value: "" }}
        form={{
          touched: { radioGroup: true },
          errors: { radioGroup: "Error" },
          setFieldValue: jest.fn()
        }}
        classes={{
          parent: "parentClass"
        }}
        options={options}
      />
    );

    const error = getByText("Error");
    expect(error).toBeTruthy();
  });

  it("renders with disabled state", () => {
    const { getByLabelText } = render(
      <InlineRadioGroup
        label="Radio Group"
        field={{ name: "radioGroup", value: "" }}
        form={{ touched: {}, errors: {}, setFieldValue: jest.fn() }}
        classes={{
          parent: "parentClass"
        }}
        options={options}
        disabled
      />
    );

    options.forEach(option => {
      const radioOption = getByLabelText(option.label);
      expect(radioOption).toHaveProperty("disabled", true);
    });
  });

  it("handles onchange event correctly when onChange is not passed", () => {
    const { getByLabelText } = render(
      <InlineRadioGroup
        label="Radio Group"
        field={{ name: "radioGroup", value: "" }}
        form={{ touched: {}, errors: {}, setFieldValue: jest.fn() }}
        classes={{
          parent: "parentClass"
        }}
        options={options}
      />
    );

    const radioOption = getByLabelText("Option 2");
    fireEvent.click(radioOption);
  });
});
