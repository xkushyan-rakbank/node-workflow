import React, { useState, useRef, memo } from "react";
import { FormControl } from "@material-ui/core";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import { getIn } from "formik";

import { InfoTitle } from "../../InfoTitle";
import { ErrorMessage, ContexualHelp } from "../../Notifications";
import { StyledKeyboardDatePicker } from "./StyledKeyboadDatePicker";
import { PickerToolbar } from "./PickerToolbar/PickerToolbar";
import { useStyles } from "./styled";

import { areEqualFieldProps } from "../utils";

class LocalizedUtils extends DateFnsUtils {
  getWeekdays() {
    return ["M", "T", "W", "T", "F", "S", "S"];
  }
}

const INDENT_BOTTOM_PX = 20;
const scrollIntoView = (datePickerRef, dateInputRef, actionRef) => {
  const menuEl = datePickerRef.current;
  const focusedEl = dateInputRef.current;

  const { offsetHeight } = menuEl.querySelector("[role='document']");
  const { bottom } = focusedEl.getBoundingClientRect();
  const { scrollY, innerHeight } = window;

  if (scrollY + bottom + offsetHeight > scrollY + innerHeight) {
    window.scrollTo(
      0,
      scrollY + (scrollY + bottom + offsetHeight) - (scrollY + innerHeight) + INDENT_BOTTOM_PX
    );
    actionRef.current && actionRef.current.updatePosition();
  }
};

const DatePickerBase = ({
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
          <StyledKeyboardDatePicker
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
            keyboardIcon={null}
            PopoverProps={{
              anchorOrigin: { horizontal: "left", vertical: "bottom" },
              transformOrigin: { horizontal: "left", vertical: "top" },
              ref: ref => {
                datePickerRef.current = ref;
                ref && scrollIntoView(datePickerRef, dateInputRef, actionRef);
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

export const DatePicker = memo(DatePickerBase, areEqualFieldProps);
