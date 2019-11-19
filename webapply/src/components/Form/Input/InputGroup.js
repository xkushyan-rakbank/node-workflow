import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { useStyles } from "./styled";

export const InputGroup = props => {
  const classes = useStyles();
  return (
    <FormGroup row className={classes.selectCombined}>
      {props.children}
    </FormGroup>
  );
};
