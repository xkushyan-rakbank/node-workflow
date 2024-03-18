import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { render } from "@testing-library/react";
import { Avatar } from "../Avatar";

describe("Avatar", () => {
  const renderComponent = (props = {}) => {
    const theme = createMuiTheme();
    return render(
      <ThemeProvider theme={theme}>
        <Avatar {...props} />
      </ThemeProvider>
    );
  };
  it("renders without crashing", () => {
    renderComponent();
  });

  it("renders the default avatar icon when no name or fullName is provided", () => {
    const { getByTestId } = renderComponent();
    const defaultAvatarIcon = getByTestId("default-avatar-icon");
    expect(defaultAvatarIcon).toBeTruthy();
  });

  it("renders the first letter of the first name when only firstName is provided", () => {
    const firstName = "John";
    const { getByText } = renderComponent({ firstName });
    const firstLetter = getByText(firstName.charAt(0));
    expect(firstLetter).toBeTruthy();
  });

  it("renders the first letter of the last name when only lastName is provided", () => {
    const lastName = "Doe";
    const { getByText } = renderComponent({ lastName });
    const firstLetter = getByText(lastName.charAt(0));
    expect(firstLetter).toBeTruthy();
  });

  it("renders the first letter of the full name when only fullName is provided", () => {
    const fullName = "John Doe";
    const { getByText } = renderComponent({ fullName });
    const firstLetter = getByText("JD");
    expect(firstLetter).toBeTruthy();
  });

  it("renders the ColoredAvatar component when index prop is provided", () => {
    const index = 1;
    const { getByTestId } = renderComponent({ index });
    const coloredAvatar = getByTestId("default-avatar-icon");
    expect(coloredAvatar).toBeTruthy();
  });

  it("renders the ColoredAvatar component when isEmptyAvatar prop is true", () => {
    const { getByTestId } = renderComponent({ isEmptyAvatar: true });
    const coloredAvatar = getByTestId("empty-avatar");
    expect(coloredAvatar).toBeTruthy();
  });

  it("renders when isEmptyAvatar prop is true and defaultAvatarIcon is provided", () => {
    const defaultAvatarIcon = "defaultAvatarIcon";
    const { getByTestId } = renderComponent({ isEmptyAvatar: true, defaultAvatarIcon });
    const coloredAvatar = getByTestId("empty-avatar");
    expect(coloredAvatar).toBeTruthy();
  });
});
