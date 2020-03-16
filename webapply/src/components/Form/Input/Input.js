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
  field: { onBlur, ...field },
  shrink,
  infoTitle,
  form: { errors, touched },
  classes: extendedClasses,
  InputProps,
  ErrorMessageComponent = ErrorMessage,
  ...props
}) => {
  const classes = useStyles({ classes: extendedClasses });
  const [hasFocus, setFocus] = useState(false);

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
          error={!!isError}
          InputProps={{
            ...InputProps,
            classes: { input: classes.input, inputMultiline: classes.inputMultiline }
          }}
          InputLabelProps={{ shrink }}
          onFocus={() => {
            if (isIE) {
              setFocus(true);
            }
          }}
          onBlur={event => {
            if (isIE) {
              setFocus(false);
            }
            onBlur(event);
          }}
        />
      </ContexualHelp>
      {isIE && !field.value && hasFocus && (
        <mark className={classes.iePlaceholder}>{placeholder}</mark>
      )}

      {isError && <ErrorMessageComponent error={errorMessage} />}

      {infoTitle && <InfoTitle title={infoTitle} />}
    </FormControl>
  );
};
