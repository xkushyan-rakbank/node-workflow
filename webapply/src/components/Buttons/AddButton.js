import React from "react";
import { styled } from "@material-ui/styles";

import { ReactComponent as Icon } from "../../assets/icons/add-icon.svg";
import { theme } from "../../theme";

export const AddIcon = styled(Icon)({
  width: "24px",
  height: "24px",
  marginRight: "9px"
});

export const Button = styled("button")({
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  fontSize: "16px",
  fontWeight: 600,
  border: "none",
  cursor: "pointer",
  padding: "0",
  outline: "none",
  "&[disabled]": {
    opacity: "0.5"
  }
});

Button.defaultProps = {
  style: theme.palette.button
};

export const Text = styled("span")({
  fontSize: "14px",
  lineHeight: "1.71",
  fontWeight: 400,
  fontStyle: "normal",
  fontStretch: "normal"
});

Text.defaultProps = {
  style: theme.palette.text
};

export const AddButton = ({ classes, title = "Add", className = "", ...rest }) => (
  <Button className={className} type="button" {...rest}>
    <AddIcon alt="add" />
    <Text>{title}</Text>
  </Button>
);
