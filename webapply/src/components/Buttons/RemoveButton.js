import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import removeIcon from "../../assets/icons/remove_icon.png";

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
      right: "auto",
      left: "12px"
    }
  },
  text: {
    fontSize: "14px",
    lineHeight: "1.71",
    color: "#373737",
    fontWeight: 400,
    fontStyle: "normal",
    fontStretch: "normal"
  },
  icon: {
    width: "24px",
    height: "24px",
    marginRight: "9px"
  }
};

const RemoveButton = props => {
  const { classes, title = "Remove", className, ...rest } = props;
  return (
    <button className={cx(classes.container, className)} type="button" {...rest}>
      <img src={removeIcon} alt="remove" className={classes.icon} />
      <span className={classes.text}>{title}</span>
    </button>
  );
};

export default withStyles(style)(RemoveButton);
