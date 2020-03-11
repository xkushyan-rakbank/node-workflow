import React, { memo } from "react";
import { withStyles } from "@material-ui/core/styles";
import { ContainedButton } from "./ContainedButton";

const styles = {
  buttonStyle: {
    width: "145px",
    minHeight: 40,
    borderRadius: "21px",
    padding: "8px 20px",
    backgroundColor: "#3b3a3a",
    fontFamily: "Open Sans, sans-serif",
    lineHeight: "normal",
    letterSpacing: "normal",
    "& span": {
      justifyContent: "center",
      fontSize: "16px"
    }
  }
};

const ContinueButtonBase = withStyles(styles)(({ label = "Continue", classes, ...rest }) => (
  <ContainedButton className={classes.buttonStyle} label={label} {...rest} />
));

export const ContinueButton = memo(ContinueButtonBase);
