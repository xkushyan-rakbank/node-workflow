import React from "react";
import DoneIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core";

const style = {
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

const AddIcon = ({ classes }) => (
  <div className={classes.iconWrapper}>
    <DoneIcon className={classes.icon} />
  </div>
);

export default withStyles(style)(AddIcon);
