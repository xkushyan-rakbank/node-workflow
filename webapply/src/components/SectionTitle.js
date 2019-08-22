import React from "react";
import { withStyles } from "@material-ui/core/styles";
import cx from "classnames";

const styles = {
  wrapper: {
    display: "flex",
    fontSize: "20px",
    fontWeight: 600,
    alignItems: "center",
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

const SectionTitle = props => {
  const { classes, title } = props;
  return (
    <div className={cx(classes.wrapper, props.className)}>
      <div className={classes.divider} />
      {title}
    </div>
  );
};

export default withStyles(styles)(SectionTitle);
