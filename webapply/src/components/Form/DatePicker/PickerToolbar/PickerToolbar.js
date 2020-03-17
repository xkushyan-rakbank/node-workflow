import React from "react";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import isFuture from "date-fns/isFuture";

import { PickerSelect } from "../PickerSelect/PickerSelect";
import { useStyles } from "./styled";

export const PickerToolbar = ({ date, onChange, disableFuture, ...rest }) => {
  const classes = useStyles();

  const onMonthChange = month => {
    const newDate = setMonth(date, month);
    onChange(disableFuture && isFuture(newDate) ? new Date() : newDate);
  };
  const onYearChange = year => {
    const newDate = setYear(date, year);
    onChange(disableFuture && isFuture(newDate) ? new Date() : newDate);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        <PickerSelect date={date} onChange={onMonthChange} type="month" />
      </div>
      <div className={classes.column}>
        <PickerSelect date={date} onChange={onYearChange} type="year" />
      </div>
    </div>
  );
};
