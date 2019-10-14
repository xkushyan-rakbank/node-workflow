import React from "react";
import DoneIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core";

const style = {
  iconWrapper: {
    width: "40px",
    height: "40px",
    boxSizing: "border-box",
    border: "solid 1.5px #e9e9ed",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "10px"
  },
  icon: {
    fontSize: "20px",
    color: "#000000"
  }
};

const AddIcon = ({ classes }) => (
  <div className={classes.iconWrapper}>
    <DoneIcon className={classes.icon} />
  </div>
);

export default withStyles(style)(AddIcon);
