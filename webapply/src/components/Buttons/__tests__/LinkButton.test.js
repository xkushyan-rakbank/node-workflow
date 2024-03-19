import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { LinkButton } from "../LinkButton";

describe("LinkButton", () => {
  it("renders button with correct title", () => {
    const title = "Edit";
    const { getByText } = render(<LinkButton title={title} />);
    const buttonElement = getByText(title);
    expect(buttonElement).toBeTruthy();
  });

  it("calls clickHandler when button is clicked", () => {
    const clickHandler = jest.fn();
    const { getByText } = render(<LinkButton clickHandler={clickHandler} />);
    const buttonElement = getByText("Edit");
    fireEvent.click(buttonElement);
    expect(clickHandler).toHaveBeenCalled();
  });

  // Add more tests as needed...
});
