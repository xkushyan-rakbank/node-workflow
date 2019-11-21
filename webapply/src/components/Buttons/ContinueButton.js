import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { ContainedButton } from "./ContainedButton";

const styles = {
  buttonStyle: {
    width: "180px",
    height: "40px",
    borderRadius: "21px ",
    backgroundColor: "#000",
    fontFamily: "Open Sans, sans-serif",
    fontSize: "18px",
    lineHeight: "normal",
    letterSpacing: "normal",
    "& span": {
      justifyContent: "center"
    }
  }
};

export const ContinueButton = withStyles(styles)(({ label = "Continue", classes, ...rest }) => (
  <ContainedButton className={classes.buttonStyle} label={label} {...rest} />
));
