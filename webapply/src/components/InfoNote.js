import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  note: {
    fontSize: "12px",
    textAlign: "center",
    color: "#888888",
    marginTop: "33px",
    display: "block"
  }
};

const InfoNote = ({ text, classes }) => (
  <span className={classes.note}>{text}</span>
);

export default withStyles(style)(InfoNote);
