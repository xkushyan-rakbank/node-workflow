import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ContainedButton from "./ContainedButton";

const styles = {
  buttonStyle: {
    width: "180px",
    height: "40px",
    borderRadius: "21px ",
    backgroundColor: "#000",
    fontSize: "18px",
    lineHeight: "normal",
    letterSpacing: "normal",
    "& span": {
      justifyContent: "center"
    }
  }
};

const ContinueButton = props => {
  const {
    label = "Continue",
    disabled = false,
    handleClick,
    classes,
    ...rest
  } = props;
  return (
    <ContainedButton
      className={classes.buttonStyle}
      disabled={disabled}
      handleClick={handleClick}
      label={label}
      {...rest}
    />
  );
};

export default withStyles(styles)(ContinueButton);
