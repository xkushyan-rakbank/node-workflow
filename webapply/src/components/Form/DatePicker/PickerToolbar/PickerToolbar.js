import React from "react";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import isFuture from "date-fns/isFuture";

import { PickerSelect } from "../PickerSelect/PickerSelect";
import { useStyles } from "./styled";

export const PickerToolbar = ({ date, onChange, disableFuture, onMonthChange, onYearChange }) => {
  const classes = useStyles();

  const onMonthChangeHandler = month => {
    const newDate = setMonth(date, month);
    onMonthChange();
    onChange(disableFuture && isFuture(newDate) ? new Date() : newDate);
  };
  const onYearChangeHandler = year => {
    onYearChange();
    const newDate = setYear(date, year);
    onChange(disableFuture && isFuture(newDate) ? new Date() : newDate);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        <PickerSelect date={date} onChange={onMonthChangeHandler} type="month" />
      </div>
      <div className={classes.column}>
        <PickerSelect
          isFutureDisabled={disableFuture}
          date={date}
          onChange={onYearChangeHandler}
          type="year"
        />
      </div>
    </div>
  );
};
