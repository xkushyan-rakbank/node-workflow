import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApplicationError } from "../ApplicationError";

describe("ApplicationError", () => {
  it("renders the error message", () => {
    const errorMessage = "An error occurred";
    render(<ApplicationError text={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it("renders the back to home button", () => {
    const backButtonLabel = "Back to home";
    const text = `An error occurred. $ ${backButtonLabel}`;
    render(<ApplicationError text={text} />);
    expect(screen.getByText(backButtonLabel)).toBeTruthy();
  });

  it("renders when link is provided", () => {
    const link = "/home";
    const { getByText } = render(<ApplicationError text="An error occurred" link={link} />);
    expect(getByText("Back to home")).toBeTruthy();
  });

  it("calls the onClick handler when the back to home button is clicked", () => {
    const link = "/home";
    const { getByText } = render(
      <MemoryRouter>
        <ApplicationError text="An error occurred" link={link} />
      </MemoryRouter>
    );
    const backButton = getByText("Back to home");
    fireEvent.click(backButton);
  });

  it("calls the onCLick when buttons with external is provided", () => {
    const link = "https://www.google.com";
    const buttons = [
      {
        label: "Back to home",
        external: true,
        link
      },
      {
        label: "Back to home 2",
        link
      }
    ];
    const { getByText } = render(
      <ApplicationError text="An error occurred" link={link} buttons={buttons} />
    );
    const backButton = getByText("Back to home");
    fireEvent.click(backButton);
  });

  it("renders when screeningType is 403", () => {
    const { getByText } = render(<ApplicationError text="An error occurred" screeningType={403} />);
    expect(getByText("Thank You for choosing our bank assisted application process")).toBeTruthy();
  });
});
