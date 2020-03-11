import React, { memo } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { useStyles } from "./styled";
import { ErrorMessage } from "../../Notifications";

const InputGroupBase = ({ error, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.inputGroupWrapper}>
      <FormGroup row className={classes.selectCombined}>
        {children}
      </FormGroup>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

const areEqual = (prevProps, nextProps) => prevProps.error === nextProps.error;

export const InputGroup = memo(InputGroupBase, areEqual);
