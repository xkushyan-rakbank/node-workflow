import React from "react";
import { withStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/InfoOutlined";
import cx from "classnames";

const styles = {
  wrapper: {
    display: "flex",
    fontSize: "12px",
    fontWeight: "normal",
    lineHeight: 1.33,
    color: "#517085",
    alignItems: "center",
    marginTop: "10px !important"
  },
  icon: {
    fontSize: "13.1px",
    marginRight: "6.4px"
  }
};

const InfoTitle = props => {
  const { classes } = props;

  return (
    <div className={cx(classes.wrapper, props.className)}>
      <InfoIcon className={classes.icon} />
      {props.title}
    </div>
  );
};

export default withStyles(styles)(InfoTitle);
