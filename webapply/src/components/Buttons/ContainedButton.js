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
    height: "56px",
    borderRadius: "28px ",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "0 36px",
    backgroundColor: "#000",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    }
  },
  labelStyle: {
    fontSize: "18px",
    textAlign: "left",
    color: "#ffffff",
    justifyContent: "space-between"
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
  name
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
  >
    {label}
    {withRightArrow && <ArrowIcon alt="rightArrowWhite" />}
  </Button>
);

export const ContainedButton = withStyles(styles)(BaseButton);
