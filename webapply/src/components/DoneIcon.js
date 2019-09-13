import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";

const styles = {
  iconWrapper: {
    border: "1.5px solid #517085",
    borderRadius: "50%",
    width: "22px",
    fontSize: "22px",
    color: "#517085",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  doneIcon: {
    fontSize: "13px"
  }
};

const Icon = ({ classes, className }) => (
  <div className={cx(classes.iconWrapper, className)}>
    <DoneIcon className={classes.doneIcon} />
  </div>
);

export default withStyles(styles)(Icon);
