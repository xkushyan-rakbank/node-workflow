import React, { memo, useState, useCallback } from "react";
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
  minDate = new Date(1950, 0, 1),
  maxDate = new Date(),
  form: { errors, touched, setFieldValue },
  datePickerProps = {},
  contextualHelpText,
  contextualHelpProps = {},
  onChange = value => setFieldValue(field.name, value)
}) => {
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState({
    isSelectedMonth: false,
    isSelectedYear: false
  });

  const setMonthIsSelected = useCallback(() => {
    setSelectedDate({ ...selectedDate, isSelectedMonth: true });
  }, [selectedDate, setSelectedDate]);
  const setYearIsSelected = useCallback(() => {
    setSelectedDate({ ...selectedDate, isSelectedYear: true });
  }, [selectedDate, setSelectedDate]);

  return (
    <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
      <FormControl className="formControl">
        <MuiPickersUtilsProvider utils={LocalizedUtils}>
          <StyledKeyboardDatePicker
            autoOk={Object.values(selectedDate).every(Boolean)}
            onMonthChange={setMonthIsSelected}
            onYearChange={setYearIsSelected}
            autoComplete="off"
            label={label}
            minDate={minDate}
            maxDate={maxDate}
            disabled={disabled}
            disableFuture
            margin="normal"
            format={format}
            inputVariant="outlined"
            variant="inline"
            placeholder={placeholder}
            error={isError}
            invalidDateMessage={false}
            maxDateMessage={false}
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
