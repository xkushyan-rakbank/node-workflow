import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  wrapper: {
    margin: "24px 0 10px",
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#373737"
  },
  divider: {
    width: "5px",
    height: "24px",
    borderRadius: "2px",
    backgroundColor: "#517085",
    marginRight: "11px"
  }
};

const Subtitle = ({ classes, title }) => {
  return <div className={classes.wrapper}>{title}</div>;
};

export default withStyles(styles)(Subtitle);
