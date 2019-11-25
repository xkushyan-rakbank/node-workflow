import React from "react";
import { withStyles } from "@material-ui/core";
import doneIcon from "./../assets/icons/add.svg";

const styles = {
  icon: {
    width: "24px"
  }
};

const Icon = ({ classes, className }) => (
  <div>
    <img src={doneIcon} className={classes.icon} alt="doneIcon" />
  </div>
);

export default withStyles(styles)(Icon);
