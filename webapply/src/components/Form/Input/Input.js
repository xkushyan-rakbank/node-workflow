import React, { useState, memo } from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getIn } from "formik";
import cx from "classnames";

import { ErrorMessage, ContexualHelp } from "./../../Notifications";
import { InfoTitle } from "../../InfoTitle";
import { FieldDescription } from "../../FieldDescription";
import { checkBrowserIsIE } from "../../../utils/checkBrowserIsIE";
import { areEqualFieldProps } from "../utils";

import { useStyles } from "./styled";
import { ICONS, Icon } from "../../Icons";
import { ALLOWED_CHAR_REGEX } from "../../../utils/validation";

const allowedCharRegex = ALLOWED_CHAR_REGEX;

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
  form: { errors, touched, ...form },
  classes: extendedClasses,
  InputProps,
  ErrorMessageComponent = ErrorMessage,
  isLemnisk = false,
  totalLength,
  showCharLength = false,
  lemniskCall = value => {},
  fieldDescription,
  showCounter = true,
  showEditIcon = false,
  iconColor = "grey",
  infoIcon,
  enableAllCharacters = false,
  ...props
}) => {
  const classes = useStyles({ classes: extendedClasses });
  const [hasFocus, setFocus] = useState(false);
  const [isFieldEditable, setIsFieldEditable] = useState(disabled);

  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const isIE = checkBrowserIsIE();
  const fieldInputLength = props.fieldValueLength
    ? props.fieldValueLength
    : typeof field.value === "string"
    ? field.value.length
    : 0;

  const handleSpecialCharacterKeyPress = event => {
    const hasDisAllowedCharacters = allowedCharRegex.test(event.data);
    if (hasDisAllowedCharacters && !enableAllCharacters) {
      event.preventDefault();
    }
  };

  const handleSpecialCharacterPaste = event => {
    let paste = (event.clipboardData || window.clipboardData).getData("text/plain");
    // Replace non-breaking spaces with regular spaces
    const textWithSpaces = paste.replace(/\xA0/g, " ");
    const regex = new RegExp(allowedCharRegex, "g");
    paste = textWithSpaces.replace(regex, " ");

    event.preventDefault();
    document.execCommand("insertText", false, paste);
  };

  return (
    <FormControl classes={{ root: classes.formControlRoot }}>
      <ContexualHelp title={contextualHelpText} {...contextualHelpProps} placement={placement}>
        <TextField
          {...field}
          {...props}
          label={label}
          variant="filled"
          className={cx(classes.textField, { [classes.disabled]: isFieldEditable })}
          placeholder={placeholder}
          disabled={isFieldEditable}
          error={!!isError}
          onBeforeInput={handleSpecialCharacterKeyPress}
          onPaste={!enableAllCharacters ? handleSpecialCharacterPaste : () => {}}
          autoComplete={"off"}
          InputProps={{
            endAdornment: showEditIcon ? (
              <InputAdornment position="end">
                <Icon
                  name={ICONS.editIcon}
                  className={classes.closeIcon}
                  onClick={() => setIsFieldEditable(false)}
                />
              </InputAdornment>
            ) : null,
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
            form.setFieldValue(field.name, field?.value?.trim());
            if (isLemnisk) {
              lemniskCall(field.value);
            }
            if (isIE) {
              setFocus(false);
            }
            onBlur(event);
          }}
          data-testid={props["data-testid"]}
        />
      </ContexualHelp>
      {isIE && !field.value && hasFocus && (
        <mark className={classes.iePlaceholder}>{placeholder}</mark>
      )}

      {infoTitle && <InfoTitle title={infoTitle} />}

      {showCounter && (fieldDescription || InputProps.inputProps?.maxLength || props.maxLength) && (
        <FieldDescription
          title={fieldDescription}
          fieldValueLength={fieldInputLength}
          fieldMaxLength={InputProps.inputProps?.maxLength || props.maxLength}
          showTitleIcon={infoIcon}
          iconHeight={props?.iconHeight}
          iconWidth={props?.iconWidth}
          showInLineError={InputProps.inputProps && InputProps.inputProps.showInLineError}
        />
      )}

      {isError && <ErrorMessageComponent error={errorMessage} />}
    </FormControl>
  );
};

export const Input = memo(InputBase, areEqualFieldProps);
