import React, { useCallback } from "react";
import PropTypes from "prop-types";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

//import { useStyles } from "./styled";
import { MONTH_OPTIONS, getYearOptions } from "./constants";

export const PickerSelect = ({ date = new Date(Date.now()), onChange, type }) => {
  //const classes = useStyles();

  const value = type === "month" ? date.getMonth() : date.getFullYear();
  const options = type === "month" ? MONTH_OPTIONS : getYearOptions();

  const handleChange = useCallback(
    ({ target: { value } }) => {
      const changeDate = type === "month" ? setMonth : setYear;
      onChange(changeDate(date, value));
    },
    [date, type]
  );

  return (
    <FormControl>
      <Select value={value} onChange={handleChange}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

PickerSelect.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["month", "year"])
};
