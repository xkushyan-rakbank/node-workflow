import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { useStyles } from "./styled";
import { ErrorMessage } from "../../Notifications";

export const InputGroup = ({ error, children }) => {
  const classes = useStyles();
  return (
    <>
      <FormGroup row className={classes.selectCombined}>
        {children}
      </FormGroup>
      {error && <ErrorMessage error={error} />}
    </>
  );
};
