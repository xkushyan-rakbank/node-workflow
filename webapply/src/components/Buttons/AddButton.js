import React from "react";
import DoneIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core";
import cx from "classnames";

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
    padding: "0"
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#373737",
    fontWeight: 400,
    fontStyle: "normal",
    fontStretch: "normal"
  },
  iconWrapper: {
    width: "26px",
    height: "26px",
    boxSizing: "border-box",
    border: "solid 1.5px #16216a",
    borderRadius: "50%",
    color: "#16216a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px"
  },
  icon: {
    fontSize: "20px"
  }
};

const AddButton = props => {
  const { classes, title = "Add", className, ...rest } = props;
  return (
    <button
      className={cx(classes.container, className)}
      type="button"
      {...rest}
    >
      <div className={classes.iconWrapper}>
        <DoneIcon className={classes.icon} />
      </div>
      <span className={classes.text}>{title}</span>
    </button>
  );
};

export default withStyles(style)(AddButton);
