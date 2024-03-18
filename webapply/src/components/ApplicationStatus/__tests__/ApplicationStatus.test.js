import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ApplicationStatus } from "../ApplicationStatus";

describe("ApplicationStatus", () => {
  it("renders the component correctly", () => {
    render(<ApplicationStatus />);
  });

  it("renders when link is provided", () => {
    const link = "https://www.example.com";
    render(<ApplicationStatus link={link} />);
    const linkElement = screen.getByText("See products");
    expect(linkElement).toBeTruthy();
  });

  it("calls onClick when link is provided and buttons are provided", () => {
    const link = "https://www.example.com";
    const buttons = [
      { label: "Button 1", link: "https://www.example.com" },
      { label: "Button 2", link: "https://www.example.com", external: true }
    ];
    render(
      <MemoryRouter>
        <ApplicationStatus buttons={buttons} link={link} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("Button 1"));

    fireEvent.click(screen.getByText("Button 2"));
  });

  it("renders when screeningType is Total No of Documents uploaded check", () => {
    render(
      <MemoryRouter>
        <ApplicationStatus screeningType="Total No of Documents uploaded check" />
      </MemoryRouter>
    );
  });
});
