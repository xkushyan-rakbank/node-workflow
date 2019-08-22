import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ContainedButton from "./ContainedButton";

const styles = {
  buttonStyle: {
    width: "180px",
    height: "40px",
    borderRadius: "21px ",
    backgroundColor: "#16216a",
    fontSize: "18px",
    lineHeight: "normal",
    letterSpacing: "normal",
    "& span": {
      justifyContent: "center"
    }
  }
};

const ContinueButton = props => {
  const { label = "Continue", disabled = false, handleClick, classes } = props;
  return (
    <ContainedButton
      className={classes.buttonStyle}
      disabled={disabled}
      handleClick={handleClick}
      label={label}
    />
  );
};

export default withStyles(styles)(ContinueButton);
