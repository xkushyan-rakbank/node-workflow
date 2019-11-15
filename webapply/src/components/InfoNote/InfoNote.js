import React from "react";
import { useStyles } from "./styled";

export const InfoNoteComponent = ({ text, ...props }) => {
  const classes = useStyles();
  return (
    <span className={classes.note} {...props}>
      {text}
    </span>
  );
};
