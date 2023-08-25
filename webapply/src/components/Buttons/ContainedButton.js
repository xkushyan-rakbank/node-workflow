import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";

import { ReactComponent as Arrow } from "./../../assets/icons/whiteArrow.svg";
import { ReactComponent as Loader } from "./../../assets/icons/loader.svg";
import { theme } from "../../theme";
import { ICONS, Icon } from "../Icons";

const styles = {
  "@keyframes rotate": {
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  buttonStyle: {
    minHeight: "50px",
    height: "50px",
    borderRadius: "100px",
    outline: "none ",
    fontSize: "1rem",
    textTransform: "none",
    padding: "10px 40px",
    backgroundColor: "#3b3a3a",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    [theme.breakpoints.only("md")]: {
      fontSize: "1.125rem",
      padding: "12px 30px",
      lineHeight: "20px"
    },

    [theme.breakpoints.up("lg")]: {
      minHeight: "56px",
      height: "50px",
      fontSize: "1.25rem",
      padding: "12px 45px"
    }
  },
  labelStyle: {
    fontSize: "1rem",
    lineHeight: "20px",
    textAlign: "left",
    color: "#ffffff",
    justifyContent: "space-between",
    textTransform: "none",
    [theme.breakpoints.only("sm")]: {
      fontSize: "1.125rem",
      lineHeight: "20px"
    },

    [theme.breakpoints.up("md")]: {
      fontSize: "1.25rem",
      lineHeight: "28px",
      textAlign: "left",
      color: "#ffffff",
      justifyContent: "space-between",
      textTransform: "none"
    }
  },
  loader: {
    width: "24px",
    height: "24px",
    margin: "0 auto",
    animation: "$rotate 2s linear infinite"
  },
  arrow: {
    fill: "#FFF",
    width: "12px",
    height: "10px",
    verticalAlign: "top",
    marginLeft: 8
  },
  searchApplicantArrow: {
    fill: "#000",
    width: "12px",
    height: "10px",
    verticalAlign: "top",
    marginLeft: 8
  },
  disabledBtnStyle: {
    backgroundColor: "#CCCCCC"
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
  isSearchApplicant,
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
      label: classes.labelStyle,
      disabled: classes.disabledBtnStyle
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
        withRightArrow && (
          <Icon
            className={isSearchApplicant ? classes.searchApplicantArrow : classes.arrow}
            alt="rightArrowWhite"
            name={ICONS.arrowRight}
          />
        )
      ]
    )}
  </Button>
);

export const ContainedButton = withStyles(styles)(BaseButton);
