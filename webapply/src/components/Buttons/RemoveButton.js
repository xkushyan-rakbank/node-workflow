import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";

const style = {
  container: {
    position: "absolute",
    top: "30px",
    right: "-90px",
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
    },
    "@media only screen and (max-width: 959px)": {
      top: "80px",
      right: "12px"
    }
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#86868b",
    fontWeight: 600,
    fontStyle: "normal",
    fontStretch: "normal",
    textDecoration: "underline"
  }
};

const RemoveButton = props => {
  const { classes, title = "Remove", className, ...rest } = props;
  return (
    <button className={cx(classes.container, className)} type="button" {...rest}>
      <span className={classes.text}>{title}</span>
    </button>
  );
};

export default withStyles(style)(RemoveButton);
