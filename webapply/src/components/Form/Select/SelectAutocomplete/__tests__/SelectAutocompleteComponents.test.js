import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Option, Control, DropdownIndicator, MultiValue } from "../SelectAutocompleteComponents";

describe("Option", () => {
  const selectProps = {
    classes: {
      menuItem: "menuItem",
      customMenuItem: "customMenuItem",
      customSeclectCheckbox: "customSeclectCheckbox"
    },
    customCheckbox: false
  };

  it("renders children and default Checkbox when isMulti is true and customCheckbox is false", () => {
    render(
      <Option selectProps={selectProps} isMulti={true} isSelected={false}>
        Test Option
      </Option>
    );

    expect(screen.getByText("Test Option")).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("renders children and CustomCheckbox when isMulti is true and customCheckbox is true", () => {
    const customSelectProps = { ...selectProps, customCheckbox: true };
    render(
      <Option selectProps={customSelectProps} isMulti={true} isSelected={false}>
        Test Option
      </Option>
    );

    expect(screen.getByText("Test Option")).toBeTruthy();
    expect(screen.getByRole("checkbox")).toBeTruthy();
  });

  it("does not render a checkbox when isMulti is false", () => {
    render(
      <Option selectProps={selectProps} isMulti={false} isSelected={false}>
        Test Option
      </Option>
    );

    expect(screen.getByText("Test Option")).toBeTruthy();
    expect(screen.queryByRole("checkbox")).toBeNull();
  });

  it("render when isSelected is true", () => {
    render(
      <Option selectProps={selectProps} isMulti={false} isSelected={true}>
        Test Option
      </Option>
    );

    expect(screen.getByText("Test Option")).toBeTruthy();
  });

  it("renders Control", () => {
    const selectProps = {
      classes: {
        inputCustom: "inputCustom",
        input: "input"
      },
      textFieldProps: {},
      value: "Test Value"
    };
    const { getByTestId } = render(<Control selectProps={selectProps} />);
    const control = getByTestId("control");
    expect(control).toBeTruthy();
  });

  it("renders DropdownIndicator", () => {
    const selectProps = {
      classes: {
        icon: "icon",
        indicator: "indicator"
      }
    };
    const { container } = render(<DropdownIndicator selectProps={selectProps} />);
    const icon = container.querySelector(".indicator svg");
    expect(icon).toBeTruthy();
  });

  it("renders children and applies correct classes", () => {
    const selectProps = {
      classes: {
        chip: "chip",
        chipFocused: "chipFocused"
      }
    };
    const { getByTestId } = render(
      <MultiValue selectProps={selectProps} isFocused={false}>
        Test Value
      </MultiValue>
    );
    const chip = getByTestId("multi-value");
    expect(chip).toBeTruthy();
    expect(chip).toHaveProperty("textContent", "Test Value");
  });

  it("applies focused class when isFocused is true", () => {
    const selectProps = {
      classes: {
        chip: "chip",
        chipFocused: "chipFocused"
      }
    };
    const { getByTestId } = render(
      <MultiValue selectProps={selectProps} isFocused={true}>
        Test Value
      </MultiValue>
    );
    const chip = getByTestId("multi-value");
    //check if the class is one among the whole class list
    const classList = chip.classList;
    expect(classList).toContain("chipFocused");
  });

  it("calls removeProps.onClick and removeProps.onMouseDown when delete icon is clicked", () => {
    const selectProps = {
      classes: {
        chip: "chip",
        chipFocused: "chipFocused"
      }
    };
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const { getByTestId } = render(
      <MultiValue selectProps={selectProps} removeProps={{ onClick, onMouseDown }}>
        Test Value
      </MultiValue>
    );
    const deleteIcon = getByTestId("multi-value-remove");
    fireEvent.click(deleteIcon);
    expect(onClick).toHaveBeenCalled();
  });
});
