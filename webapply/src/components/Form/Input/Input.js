import React, { useState, memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage, ContexualHelp } from "./../../Notifications";
import { InfoTitle } from "../../InfoTitle";
import { FieldDescription } from "../../FieldDescription";
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
  totalLength,
  showCharLength = false,
  lemniskCall = value => {},
  fieldDescription,
  showCounter = true,
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
          variant="filled"
          className={cx(classes.textField, { [classes.disabled]: disabled })}
          placeholder={placeholder}
          disabled={disabled}
          error={!!isError}
          InputProps={{
            ...InputProps,
            disableUnderline: true,
            classes: {
              root: classes.filledInput,
              input: classes.input,
              inputMultiline: classes.inputMultiline,
              error: classes.filledInputError,
              disabled: classes.disabled
            }
          }}
          InputLabelProps={{
            shrink,
            classes: { filled: classes.filledLabel, shrink: classes.filledLabelShrink }
          }}
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

      {infoTitle && <InfoTitle title={infoTitle} />}

      {showCounter && (fieldDescription || InputProps.inputProps?.maxLength) && (
        <FieldDescription
          title={fieldDescription}
          fieldValueLength={typeof field.value === "string" ? field.value.length : 0}
          fieldMaxLength={InputProps.inputProps?.maxLength}
        />
      )}

      {isError && <ErrorMessageComponent error={errorMessage} />}
    </FormControl>
  );
};

export const Input = memo(InputBase, areEqualFieldProps);
