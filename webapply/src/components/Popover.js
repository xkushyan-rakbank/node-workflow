import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  popover: {
    top: "-11px",
    left: "37px",
    color: "#000000",
    width: "232px",
    padding: "16px",
    zIndex: "2",
    position: "absolute",
    fontSize: "12px",
    boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.14)",
    lineHeight: "1.33",
    borderRadius: "8px",
    backgroundColor: "#ffffff"
  },
  popoverArrow: {
    top: "20px",
    width: 0,
    height: 0,
    position: "absolute",
    boxShadow: "0 2px 18px 0 rgba(0, 0, 0, 0.14)",
    borderBottom: "6px solid transparent",
    borderTop: "6px solid transparent"
  },
  left: {
    left: "-5px",
    borderRight: "6px solid #fff"
  },
  right: {
    right: "-5px",
    borderLeft: "6px solid #fff"
  }
};

function Popover(props) {
  const { classes, aligned = "left" } = props;
  return (
    <div className={classes.popover}>
      <div className={cx(classes.popoverArrow, classes[aligned])} />
      {props.message}
    </div>
  );
}

export default withStyles(styles)(Popover);
