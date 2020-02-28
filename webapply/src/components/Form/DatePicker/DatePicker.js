import React, { useState, useRef } from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
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

class LocalizedUtils extends DateFnsUtils {
  getWeekdays() {
    return ["M", "T", "W", "T", "F", "S", "S"];
  }
}

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
  const [isOpen, setIsOpen] = useState(false);

  const dateInputRef = useRef();
  const datePickerRef = useRef();
  const actionRef = useRef();

  const scrollIntoView = () => {
    // const menuEl = datePickerRef.current;
    const focusedEl = dateInputRef.current;
    // const menuRect = menuEl.querySelector("[role='document']").getBoundingClientRect();
    const focusedRect = focusedEl.getBoundingClientRect();
    // const overScroll = focusedRect.offsetHeight / 3;

    if (window.scrollY + focusedRect.bottom + 270 > window.scrollY + window.innerHeight) {
      window.scrollTo(
        0,
        window.scrollY +
          (window.scrollY + focusedRect.bottom + 270) -
          (window.scrollY + window.innerHeight) +
          20
      ); //get diff

      setTimeout(() => {
        actionRef.current && actionRef.current.updatePosition();
      }, 330);
    }
  };

  return (
    <ContexualHelp title={contextualHelpText} {...contextualHelpProps}>
      <FormControl
        className="formControl"
        ref={dateInputRef}
        onClick={e => {
          if (e.target.name) {
            setIsOpen(true);
          }
        }}
      >
        <MuiPickersUtilsProvider utils={LocalizedUtils} locale={ruLocale}>
          <BaseDatePicker
            open={isOpen}
            onClose={() => setIsOpen(false)}
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
            PopoverProps={{
              anchorOrigin: { horizontal: "left", vertical: "bottom" },
              transformOrigin: { horizontal: "left", vertical: "top" },
              ref: ref => {
                datePickerRef.current = ref;
                ref && scrollIntoView();
              },
              action: actionRef
            }}
          />
        </MuiPickersUtilsProvider>
        {infoTitle && <InfoTitle title={infoTitle} />}

        {isError && <ErrorMessage error={errorMessage} />}
      </FormControl>
    </ContexualHelp>
  );
};
