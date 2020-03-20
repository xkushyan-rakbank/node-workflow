import React from "react";
import cx from "classnames";

import Fab from "@material-ui/core/Fab";

import { useStyles } from "./styled";

import { ReactComponent as ExpandMoreIcon } from "../../assets/icons/arrowDown.svg";

export const ExpandMoreButton = ({ className = "", onClick = () => {} }) => {
  const classes = useStyles();

  return (
    <Fab
      variant="extended"
      className={cx(classes.scrollButton, className)}
      name={1}
      onClick={onClick}
    >
      Read more
      <ExpandMoreIcon className={classes.expandMoreIc} alt="scroll down" />
    </Fab>
  );
};
