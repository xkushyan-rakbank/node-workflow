import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { CustomCheckbox } from "../CustomCheckbox";

describe("CustomCheckbox", () => {
  test("renders checkbox with label", () => {
    const label = "Example Label";
    const { getByLabelText } = render(<CustomCheckbox label={label} />);
    const checkbox = getByLabelText(label);
    expect(checkbox).toBeTruthy();
  });

  test("calls onSelect callback when checkbox is clicked", () => {
    const onSelectMock = jest.fn();
    const { getByLabelText } = render(
      <CustomCheckbox label="Example Label" onSelect={onSelectMock} />
    );
    const checkbox = getByLabelText("Example Label");
    fireEvent.click(checkbox);
    expect(onSelectMock).toHaveBeenCalledTimes(1);
  });
});
