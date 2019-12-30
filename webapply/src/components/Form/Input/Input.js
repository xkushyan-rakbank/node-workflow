import React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage, InfoTitle, ContextualHelp } from "./../../Notifications";

import { useStyles } from "./styled";

export const Input = ({
  contextualHelpText,
  placement,
  disabled,
  placeholder,
  label,
  field,
  infoTitle,
  form: { errors, touched },
  classes: extendedClasses,
  InputProps,
  ...props
}) => {
  const classes = useStyles({ classes: extendedClasses });

  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  return (
    <>
      <FormControl classes={{ root: classes.formControlRoot }}>
        <ContextualHelp title={contextualHelpText} placement={placement}>
          <TextField
            {...field}
            {...props}
            label={label}
            variant="outlined"
            className={cx(classes.textField, { [classes.disabled]: disabled })}
            placeholder={placeholder}
            disabled={disabled}
            error={isError}
            InputProps={{ ...InputProps, classes: { input: classes.input } }}
          />
        </ContextualHelp>

        {isError && <ErrorMessage error={errorMessage} />}

        {infoTitle && <InfoTitle title={infoTitle} />}
      </FormControl>
    </>
  );
};
