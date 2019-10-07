import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "33px",
    display: "block",
    "@media only screen and (max-width: 1100px)": {
      marginTop: "16px"
    }
  }
};

const InfoNote = ({ text, classes, ...props }) => (
  <span className={classes.note} {...props}>
    {text}
  </span>
);

export default withStyles(style)(InfoNote);
