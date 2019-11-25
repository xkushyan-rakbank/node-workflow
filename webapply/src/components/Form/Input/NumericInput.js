import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import NumberFormat from "react-number-format";

import { ErrorMessage } from "./../../Notifications";
import { useStyles } from "./styled";

export const NumericInput = ({
  placement,
  field,
  form: { errors, touched, setFieldValue },
  inputProps,
  ...props
}) => {
  const classes = useStyles();
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const handleChange = event => setFieldValue(field.name, event.target.value);

  return (
    <>
      <FormControl className="formControl">
        <NumberFormat
          {...field}
          {...props}
          onChange={handleChange}
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
    </>
  );
};
