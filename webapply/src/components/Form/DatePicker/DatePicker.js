import React from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getIn } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import { InfoTitle } from "../../InfoTitle";
import { ErrorMessage, ContexualHelp } from "../../Notifications";
import { BaseDatePicker } from "./styled";
import { PickerToolbar } from "./PickerToolbar/PickerToolbar";

const useStyles = makeStyles({
  root: {
    "& label.Mui-focused": {
      color: "#3b3a3a"
    },
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& .Mui-focused fieldset": {
      borderColor: "#373737 !important"
    }
  }
});

export const DatePicker = ({
  field,
  label,
  disabled,
  infoTitle,
  placeholder = "__/__/____",
  format = "dd/MM/yyyy",
  minDate = new Date(1950, 0, 1),
  form: { errors, touched, setFieldValue },
  datePickerProps = {},
  contextualHelpText,
  contextualHelpProps = {},
  onChange = value => setFieldValue(field.name, value)
}) => {
  const errorMessage = getIn(errors, field.name);
  const isError = errorMessage && getIn(touched, field.name);
  const classes = useStyles();

  return (
    <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
      <FormControl className="formControl">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <BaseDatePicker
            autoComplete="off"
            label={label}
            minDate={minDate}
            disabled={disabled}
            disableFuture
            margin="normal"
            format={format}
            inputVariant="outlined"
            variant="inline"
            placeholder={placeholder}
            error={isError}
            invalidDateMessage={false}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
            {...field}
            {...datePickerProps}
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
