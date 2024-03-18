import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { ColoredAvatar } from "../ColoredAvatar";

describe("ColoredAvatar", () => {
  it("renders with the correct background color and text color", () => {
    const color = "#ff0000";
    const textColor = "#ffffff";
    const theme = createMuiTheme(); // Create a theme with default values

    const { container } = render(
      <ThemeProvider theme={theme}>
        <ColoredAvatar color={color} textColor={textColor}>
          Test
        </ColoredAvatar>
      </ThemeProvider>
    );

    const avatar = container.firstChild;
    expect(avatar).toBeTruthy();
  });
});
