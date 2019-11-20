import React from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getIn } from "formik";

import InfoTitle from "../../InfoTitle";
import { ErrorMessage } from "../../Notifications";
import { BaseDatePicker } from "./styled";

export const DatePicker = ({
  field,
  label,
  disableFuture,
  disabled,
  infoTitle,
  placeholder = "__/__/____",
  format = "dd/MM/yyyy",
  minDate = new Date("01-01-1950"),
  maxDate = new Date(),
  form: { errors, touched, setFieldValue },
  datePickerProps = {}
}) => {
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);

  return (
    <FormControl className="formControl">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <BaseDatePicker
          autoOk
          autoComplete="off"
          label={label}
          minDate={minDate}
          maxDate={maxDate}
          disabled={disabled}
          disableFuture={disableFuture}
          disableToolbar
          margin="normal"
          variant="inline"
          format={format}
          inputVariant="outlined"
          placeholder={placeholder}
          error={isError}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
          {...field}
          onChange={value => setFieldValue(field.name, value)}
          {...datePickerProps}
        />
      </MuiPickersUtilsProvider>

      {infoTitle && <InfoTitle title={infoTitle} />}

      {isError && <ErrorMessage error={errorMessage} />}
    </FormControl>
  );
};
