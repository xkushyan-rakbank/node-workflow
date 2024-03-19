import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LinkedButton } from "../LinkedButton";

describe("LinkedButton", () => {
  it("renders button with label", () => {
    const label = "Click me";
    const { getByText } = render(<LinkedButton label={label} />);
    const buttonElement = getByText(label);
    expect(buttonElement).toBeTruthy();
  });

  it("calls onClick handler when button is clicked", () => {
    const onClickMock = jest.fn();
    const { getByText } = render(<LinkedButton label="Click me" onClick={onClickMock} />);
    const buttonElement = getByText("Click me");
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
