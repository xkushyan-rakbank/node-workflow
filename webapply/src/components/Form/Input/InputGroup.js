import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { useStyles } from "./styled";

export const InputGroup = ({ children }) => {
  const classes = useStyles();
  return (
    <FormGroup row className={classes.selectCombined}>
      {children}
    </FormGroup>
  );
};
