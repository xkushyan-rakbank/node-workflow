import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import AddIcon from "../AddIcon";

const style = {};

const BackButton = props => {
  const { classes } = props;
  return (
    <button className={cx(classes.container)} type="button">
      <AddIcon />
      <span className={classes.text}>Back</span>
    </button>
  );
};

export default withStyles(style)(BackButton);
