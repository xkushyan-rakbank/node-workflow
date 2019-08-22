import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import { ReactComponent as RightArrowBlue } from "./../../assets/images/blue.svg";
import { ReactComponent as RightArrowWhite } from "./../../assets/images/white.svg";

const styles = {
  buttonStyle: {
    width: "192px",
    height: "56px",
    borderRadius: "28px ",
    outline: "none ",
    fontSize: "18px",
    textTransform: "none",
    padding: "0 25px",
    svg: {
      fontSize: "14px",
      marginLeft: "10px"
    }
  },
  labelStyle: {
    textAlign: "left",
    color: "#fff",
    justifyContent: "space-between"
  }
};

const ContainedButton = props => {
  const {
    label = "",
    type = "button",
    disabled = false,
    className = "",
    handleClick,
    color,
    icon,
    component = "button",
    classes
  } = props;

  return (
    <Button
      variant="contained"
      component={component}
      color={color || "primary"}
      type={type}
      classes={{
        root: cx(classes.buttonStyle, className),
        label: classes.labelStyle
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      {label}
      {type === "submit" && <RightArrowWhite className={classes.icon} />}
    </Button>
  );
};

export default withStyles(styles)(ContainedButton);
