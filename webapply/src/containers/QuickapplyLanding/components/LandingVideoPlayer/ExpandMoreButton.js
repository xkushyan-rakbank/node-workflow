import React from "react";
import cx from "classnames";

import Fab from "@material-ui/core/Fab";

import { useStyles } from "./styled";

export const ExpandMoreButton = ({ label = "Read more", className = "" }) => {
  const classes = useStyles();

  return (
    <Fab variant="extended" className={cx(classes.scrollButton, className)} name={1}>
      {label}
    </Fab>
  );
};
