import React, { memo } from "react";
import { styled } from "@material-ui/styles";
import { theme } from "../../theme";
import { ContexualHelp } from "../Notifications/ContexualHelp/ContexualHelp";

export const Button = styled("button")({
  fontFamily: "Open Sans, sans-serif",
  fontSize: "16px",
  fontWeight: 600,
  border: "none",
  textDecoration: "underline",
  cursor: "pointer",
  outline: "none",
  "@media (max-width: 500px)": {
    fontSize: "13px"
  }
});

Button.defaultProps = {
  style: theme.palette.button
};

const LinkButtonBase = ({
  clickHandler,
  title = "Edit",
  className = "",
  editDisabled,
  contextualHelpText = "",
  ...rest
}) => (
  <ContexualHelp title={contextualHelpText} isDisableHoverListener={!editDisabled}>
    <Button className={className} onClick={clickHandler} {...rest}>
      {title}
    </Button>
  </ContexualHelp>
);

export const LinkButton = memo(LinkButtonBase);
