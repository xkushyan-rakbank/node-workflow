import React, { memo } from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getIn } from "formik";

import { InfoTitle } from "../../InfoTitle";
import { ErrorMessage, ContexualHelp } from "../../Notifications";
import { StyledKeyboardTimePicker } from "./StyledKeyboadTimePicker";
import { areEqualFieldProps } from "../utils";

import { useStyles } from "./styled";

const TimePickerBase = ({
  field,
  label,
  disabled,
  infoTitle,
  placeholder = "__:__",
  format = "HH:mm",
  InputProps,
  form: { errors, touched, setFieldValue },
  timePickerProps = {},
  contextualHelpText,
  disableValue = null,
  openTo = "hours",
  contextualHelpProps = {},
  onChange = value => {
    setFieldValue(field.name, value);
  }
}) => {
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const classes = useStyles();
  return (
    <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
      <FormControl className="formControl timePickerWithEndAdorment">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <StyledKeyboardTimePicker
            autoOk
            ampm={false}
            autoComplete="off"
            label={label}
            disabled={disabled}
            openTo={openTo}
            margin="normal"
            format={format}
            inputVariant="outlined"
            variant="inline"
            placeholder={placeholder}
            error={false}
            InputProps={{
              ...InputProps
            }}
            KeyboardButtonProps={{
              "aria-label": "change time"
            }}
            {...field}
            {...timePickerProps}
            InputAdornmentProps={{ position: "start" }}
            value={field.value || disableValue}
            onChange={onChange}
            classes={{
              root: classes.root
            }}
          />
        </MuiPickersUtilsProvider>
        {infoTitle && <InfoTitle title={infoTitle} />}

        {isError && <ErrorMessage error={errorMessage} />}
      </FormControl>
    </ContexualHelp>
  );
};

export const TimePicker = memo(TimePickerBase, areEqualFieldProps);
