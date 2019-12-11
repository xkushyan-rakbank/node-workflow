import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";

import { ErrorMessage, InfoTitle, ContexualHelp } from "./../../Notifications";

import { useStyles } from "./styled";

export const Input = ({
  contexualHelpText,
  placement,
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  classes: extendedClasses,
  ...props
}) => {
  const classes = useStyles({ classes: extendedClasses });

  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  return (
    <>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <ContexualHelp title={contexualHelpText} placement={placement}>
          <TextField
            {...field}
            {...props}
            label={label}
            variant="outlined"
            className={classes.textField}
            placeholder={placeholder}
            disabled={disabled}
            error={isError}
          />
        </ContexualHelp>

        {isError && <ErrorMessage error={errorMessage} />}

        {infoTitle && <InfoTitle title={infoTitle} />}
      </FormControl>
    </>
  );
};
