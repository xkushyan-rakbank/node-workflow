import React, { memo } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import { useStyles } from "./styled";
import { ErrorMessage } from "../../Notifications";

const Base = ({ error, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.inputGroupWrapper}>
      <FormGroup row className={classes.ContactNumberWrapper}>
        {children}
      </FormGroup>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export const ContactNumberInputGroup = memo(Base);
