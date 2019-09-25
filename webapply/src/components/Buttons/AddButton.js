import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import AddIcon from "../AddIcon";

const style = {
  container: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: 600,
    color: "#263d4c",
    border: "none",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    padding: "0",
    outline: "none",
    "&[disabled]": {
      opacity: "0.5"
    }
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#373737",
    fontWeight: 400,
    fontStyle: "normal",
    fontStretch: "normal"
  }
};

const AddButton = props => {
  const { classes, title = "Add", className, ...rest } = props;
  return (
    <button className={cx(classes.container, className)} type="button" {...rest}>
      <AddIcon />
      <span className={classes.text}>{title}</span>
    </button>
  );
};

export default withStyles(style)(AddButton);
