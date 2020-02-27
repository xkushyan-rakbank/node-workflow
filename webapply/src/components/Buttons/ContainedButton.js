import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import { styled } from "@material-ui/styles";

import { ReactComponent as Icon } from "./../../assets/icons/whiteArrow.svg";

const ArrowIcon = styled(Icon)({
  width: "24px",
  height: "24px"
});

const styles = {
  buttonStyle: {
    minHeight: "56px",
    borderRadius: "28px",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "12px 32px",
    backgroundColor: "#3b3a3a",
    "& svg": {
      verticalAlign: "top",
      marginLeft: 18,
      marginRight: -10
    },
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }
  },
  labelStyle: {
    fontSize: "18px",
    lineHeight: "24px",
    textAlign: "left",
    color: "#ffffff",
    justifyContent: "space-between",
    textTransform: "none"
  }
};

const BaseButton = ({
  variant = "contained",
  label = "",
  type = "button",
  disabled = false,
  className = "",
  handleClick,
  color = "primary",
  component = "button",
  withRightArrow,
  classes,
  name,
  ...props
}) => (
  <Button
    variant={variant}
    component={component}
    color={color}
    type={type}
    classes={{
      root: cx(classes.buttonStyle, className),
      label: classes.labelStyle
    }}
    disabled={disabled}
    onClick={handleClick}
    name={name}
    {...props}
  >
    {label}
    {withRightArrow && <ArrowIcon alt="rightArrowWhite" />}
  </Button>
);

export const ContainedButton = withStyles(styles)(BaseButton);
