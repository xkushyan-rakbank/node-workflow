import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CustomRadioButton } from "../CustomRadioButton";

describe("CustomRadioButton", () => {
  it("renders without error", () => {
    const { getByTestId } = render(
      <CustomRadioButton label="Option 1" dataTestId={"customRadio"} />
    );
    expect(getByTestId("customRadio")).toBeTruthy();
  });

  it("displays the correct label", () => {
    const { getByText } = render(<CustomRadioButton label="Option 2" />);
    expect(getByText("Option 2")).toBeTruthy();
  });

  it("calls onSelect function when clicked", () => {
    const onSelectMock = jest.fn();
    const { getByLabelText } = render(
      <CustomRadioButton label="Option 3" onSelect={onSelectMock} />
    );

    fireEvent.click(getByLabelText("Option 3"));
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });

  it("displays the correct checked state", () => {
    const { getByLabelText } = render(<CustomRadioButton label="Option 4" checked={true} />);

    expect(getByLabelText("Option 4")).toHaveProperty("checked", true);
  });

  it("renders CustomColorRadioButton without error", () => {
    const { getByTestId } = render(
      <CustomRadioButton label="Option 1" dataTestId={"customRadio"} customIcon={false} />
    );
    expect(getByTestId("customRadio")).toBeTruthy();
  });
});
