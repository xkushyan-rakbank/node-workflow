import React from "react";
import { withStyles } from "@material-ui/core/styles";

const style = {
  divider: {
    height: "1px",
    backgroundColor: "#e6e6e680",
    margin: "30px auto 10px"
  }
};

const Divider = ({ classes, styles }) => <div className={classes.divider} style={{ ...styles }} />;

export default withStyles(style)(Divider);
