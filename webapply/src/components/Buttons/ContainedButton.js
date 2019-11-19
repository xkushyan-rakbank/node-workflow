import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import rightArrowWhite from "./../../assets/icons/whiteArrow.png";

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
    },
    svg: {
      fontSize: "14px",
      marginLeft: "10px"
    }
  },
  labelStyle: {
    fontSize: "18px",
    textAlign: "left",
    color: "#ffffff",
    justifyContent: "space-between"
  }
};

const ContainedButton = props => {
  const {
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
  } = props;

  return (
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
      {withRightArrow && (
        <img src={rightArrowWhite} alt="rightArrowWhite" className={classes.icon} />
      )}
    </Button>
  );
};

export default withStyles(styles)(ContainedButton);
