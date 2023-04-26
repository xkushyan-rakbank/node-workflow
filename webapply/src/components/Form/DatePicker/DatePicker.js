import React, { memo } from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { getIn } from "formik";

import { InfoTitle } from "../../InfoTitle";
import { ErrorMessage, ContexualHelp } from "../../Notifications";
import { StyledKeyboardDatePicker } from "./StyledKeyboadDatePicker";
import { PickerToolbar } from "./PickerToolbar/PickerToolbar";

import { areEqualFieldProps } from "../utils";
import { LocalizedUtils } from "./utils";

import { useStyles } from "./styled";

const DatePickerBase = ({
  field,
  label,
  disabled,
  infoTitle,
  placeholder = "__/__/____",
  format = "dd/MM/yyyy",
  minDate = new Date(1900, 0, 1),
  maxDate = "",
  form: { errors, touched, setFieldValue },
  datePickerProps = {},
  contextualHelpText,
  contextualHelpProps = {},
  disableFuture = false,
  onChange = value => setFieldValue(field.name, value)
}) => {
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const classes = useStyles();

  return (
    <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
      <FormControl className="formControl">
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
          <StyledKeyboardDatePicker
            autoOk
            autoComplete="off"
            label={label}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            disableFuture={disableFuture}
            margin="normal"
            format={format}
            inputVariant="outlined"
            variant="inline"
            placeholder={placeholder}
            error={false}
            invalidDateMessage={false}
            maxDateMessage={false}
            minDateMessage={false}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            {...field}
            {...datePickerProps}
            InputAdornmentProps={{ position: "start" }}
            value={field.value || null}
            ToolbarComponent={PickerToolbar}
            views={["date"]}
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

export const DatePicker = memo(DatePickerBase, areEqualFieldProps);
