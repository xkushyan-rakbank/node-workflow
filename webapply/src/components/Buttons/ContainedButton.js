import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";

import { ReactComponent as Arrow } from "./../../assets/icons/whiteArrow.svg";
import { ReactComponent as Loader } from "./../../assets/icons/loader.svg";

const styles = {
  "@keyframes rotate": {
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  buttonStyle: {
    minHeight: "56px",
    borderRadius: "28px",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "15px 32px",
    backgroundColor: "#3b3a3a",
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
  },
  loader: {
    width: "24px",
    height: "24px",
    margin: "0 auto",
    animation: "$rotate 2s linear infinite"
  },
  arrow: {
    width: "24px",
    height: "24px",
    verticalAlign: "top",
    marginLeft: 18,
    marginRight: -10
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
  isDisplayLoader,
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
    disabled={isDisplayLoader || disabled}
    onClick={handleClick}
    name={name}
    {...props}
  >
    {isDisplayLoader ? (
      <Loader className={classes.loader} alt="loading" />
    ) : (
      [
        label,
        withRightArrow && <Arrow key="arrow" className={classes.arrow} alt="rightArrowWhite" />
      ]
    )}
  </Button>
);

export const ContainedButton = withStyles(styles)(BaseButton);
