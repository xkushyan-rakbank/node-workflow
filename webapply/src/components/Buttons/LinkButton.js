import React from "react";
import { withStyles } from "@material-ui/core";
import cx from "classnames";

const style = {
  editButton: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "16px",
    fontWeight: 600,
    color: "#263d4c",
    border: "none",
    backgroundColor: "#ffffff",
    textDecoration: "underline",
    cursor: "pointer"
  }
};

const LinkButton = props => {
  const { classes, clickHandler, title = "Edit", className } = props;
  return (
    <button className={cx(classes.editButton, className)} onClick={clickHandler}>
      {title}
    </button>
  );
};

export default withStyles(style)(LinkButton);
