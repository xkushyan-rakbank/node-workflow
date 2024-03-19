import React from "react";
import { render, screen } from "@testing-library/react";
import { ContinueButton } from "../ContinueButton";

describe("ContinueButton", () => {
  it("renders with default label", () => {
    render(<ContinueButton />);
    const buttonElement = screen.getByText("Continue");
    expect(buttonElement).toBeTruthy();
  });

  it("renders with custom label", () => {
    render(<ContinueButton label="Next" />);
    const buttonElement = screen.getByText("Next");
    expect(buttonElement).toBeTruthy();
  });
});
