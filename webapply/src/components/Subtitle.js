import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  wrapper: {
    margin: "24px 0 14px",
    fontSize: "20px",
    lineHeight: 1.5,
    color: "#373737",
    fontWeight: 600
  },
  divider: {
    width: "5px",
    height: "24px",
    borderRadius: "2px",
    backgroundColor: "#517085",
    marginRight: "11px"
  }
};

const Subtitle = props => {
  const { classes, title } = props;
  return <div className={classes.wrapper}>{title}</div>;
};

export default withStyles(styles)(Subtitle);
