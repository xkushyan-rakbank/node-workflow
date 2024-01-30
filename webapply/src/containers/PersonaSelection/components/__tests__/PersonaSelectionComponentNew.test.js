import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PersonaSelectionComponentNew from "../PersonaSelectionComponentNew";
import { Personas } from "../../../../constants";
import routes from "../../../../routes";
import { useTrackingHistory } from "../../../../utils/useTrackingHistory";
jest.mock("../../../../utils/useTrackingHistory"); // Mock the useTrackingHistory module

describe("PersonaSelectionComponentNew", () => {
  it("renders without crashing", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
  });

  it("renders the Track my application button", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const { getAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const trackApplication = getAllByTestId("trackNSwitchAccountBtn");
    expect(trackApplication.length).toBe(1);
  });

  it("displays title of personas", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const { getByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaTitle = getByTestId("persona-title");
    expect(personaTitle.innerHTML).toBe("I'm a Sole Proprietor with an LLC");
  });

  it("displays no subtitle of personas", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["ONBEHALF"]];
    const { queryAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaSubtitle = queryAllByTestId("persona-subtitle");
    expect(personaSubtitle.length).toBe(personas[0].subTitle.length);
  });

  it("displays the subtitles of personas", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const { getAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaSubtitle = getAllByTestId("persona-subtitle");
    expect(personaSubtitle.length).toBe(personas[0].subTitle.length);
  });

  it("displays the multiple subtitles of personas", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["OTHER"]];
    const { getAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaSubtitleList = getAllByTestId("persona-subtitle-list");
    expect(personaSubtitleList.length).toBe(personas[0].subTitle.length);
  });

  it("displays the correct number of personas", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const { getAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaItems = getAllByTestId("persona-item");
    expect(personaItems.length).toBe(personas.length);
  });

  it("calls handleNavigation when a persona is selected", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const { getAllByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );
    const personaItems = getAllByTestId("persona-item");
    fireEvent.click(personaItems[0]);
    expect(handleNavigation).toHaveBeenCalledTimes(1);
  });

  it("calls handleRedirection with the correct arguments when 'Track my application' button is clicked", () => {
    const handleNavigation = jest.fn();
    const personas = [Personas["SPLL"]];
    const pushHistory = jest.fn();

    // Mock the useTrackingHistory hook to return the mock pushHistory function
    useTrackingHistory.mockReturnValue(pushHistory);

    const { getByTestId } = render(
      <PersonaSelectionComponentNew personas={personas} handleNavigation={handleNavigation} />
    );

    const trackApplicationButton = getByTestId("trackNSwitchAccountBtn");
    fireEvent.click(trackApplicationButton);

    expect(pushHistory).toHaveBeenCalledWith(routes.comeBackLogin, false, {
      notClearSession: true
    });
  });
});
