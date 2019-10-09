import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "25px",
    display: "block",
    top: "calc(100vh - 290px)",
    position: "absolute",
    left: "0",
    right: "0",
    "@media only screen and (max-height: 925px)": {
      top: "calc(100vh - 274px)"
    },
    "@media only screen and (max-height: 885px)": {
      top: "calc(100vh - 163px)"
    }
  }
};

const InfoNote = ({ text, classes, ...props }) => (
  <span className={classes.note} {...props}>
    {text}
  </span>
);

export default withStyles(style)(InfoNote);
