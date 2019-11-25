import React from "react";
import { styled } from "@material-ui/styles";
import { theme } from "../../theme";

export const Button = styled("button")({
  fontFamily: "Open Sans, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  border: "none",
  textDecoration: "underline",
  cursor: "pointer"
});

Button.defaultProps = {
  style: theme.palette.button
};

export const LinkButton = ({ clickHandler, title = "Edit", className = "", ...rest }) => (
  <Button className={className} onClick={clickHandler} {...rest}>
    {title}
  </Button>
);
