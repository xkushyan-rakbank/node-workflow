import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "../AddIcon";

const styles = {
  buttonStyle: {
    border: 0,
    color: "#000",
    display: "flex",
    height: "104px",
    width: "100%",
    justifyContent: "flex-start",
    textTransform: "inherit",
    fontSize: "20px",
    "&:hover": {
      border: 0
    }
  },
  labelStyle: {
    margin: "0 14px"
  }
};

const ContainedButton = props => {
  const {
    variant = "outlined",
    label = "Add Another Stakeholder",
    type = "button",
    disabled = false,
    className = "",
    handleClick,
    color = "primary",
    component = "button",
    classes
  } = props;

  return (
    <Button
      variant={variant}
      component={component}
      color={color}
      type={type}
      classes={{
        root: cx(classes.buttonStyle, className)
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      <AddIcon />
      <div className={classes.labelStyle}>{label}</div>
    </Button>
  );
};

export default withStyles(styles)(ContainedButton);
