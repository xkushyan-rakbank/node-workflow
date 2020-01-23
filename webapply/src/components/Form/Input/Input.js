import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage, InfoTitle, ContexualHelp } from "./../../Notifications";
import { checkBrowserIsIE } from "../../../utils/checkBrowserIsIE";

import { useStyles } from "./styled";

export const Input = ({
  contextualHelpText,
  contextualHelpProps,
  placement,
  disabled,
  placeholder,
  label,
  field,
  shrink,
  infoTitle,
  form: { errors, touched },
  classes: extendedClasses,
  InputProps,
  onFocus,
  onBlur,
  ...props
}) => {
  const classes = useStyles({ classes: extendedClasses });
  const [isFocused, setFocused] = useState(false);

  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const isIE = checkBrowserIsIE();

  return (
    <FormControl classes={{ root: classes.formControlRoot }}>
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps} placement={placement}>
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
          InputLabelProps={{ shrink }}
          onFocus={() => {
            if (isIE) {
              setFocused(true);
            }
            onFocus && onFocus();
          }}
          onBlur={() => {
            if (isIE) {
              setFocused(false);
            }
            onBlur && onBlur();
          }}
        />
      </ContexualHelp>
      {isIE && field.value.length === 0 && isFocused && (
        <div className={classes.iePlaceholder}>{placeholder}</div>
      )}

      {isError && <ErrorMessage error={errorMessage} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
