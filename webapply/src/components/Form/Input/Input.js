import React, { useState, memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage, ContexualHelp } from "./../../Notifications";
import { InfoTitle } from "../../InfoTitle";
import { checkBrowserIsIE } from "../../../utils/checkBrowserIsIE";
import { areEqualFieldProps } from "../utils";

import { useStyles } from "./styled";

const InputBase = ({
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
  isLemnisk = false,
  lemniskCall = value => {},
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
            if (isLemnisk) {
              {
                lemniskCall(field.value);
              }
            }
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

export const Input = memo(InputBase, areEqualFieldProps);
