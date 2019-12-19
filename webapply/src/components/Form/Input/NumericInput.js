import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import NumberFormat from "react-number-format";

import { ErrorMessage } from "./../../Notifications";
import { useStyles } from "./styled";

export const NumericInput = ({
  placement,
  field: { name, value },
  form: { errors, touched },
  inputProps,
  setFieldValue,
  ...props
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, name);
  const isError = errorMessage && getIn(touched, name);
  return (
    <FormControl className="formControl">
      <NumberFormat
        {...props}
        name={name}
        value={value}
        variant="outlined"
        className={classes.textField}
        customInput={TextField}
        error={isError}
        InputProps={{
          ...inputProps
        }}
      />

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
