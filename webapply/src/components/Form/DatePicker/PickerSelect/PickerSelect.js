import React, { useCallback } from "react";
import PropTypes from "prop-types";
import setMonth from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import { withStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { MONTH_OPTIONS, getYearOptions } from "./constants";
import { useStyles } from "./styled";

const StyledSelect = withStyles({
  root: {
    width: "110px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    maxWidth: "120px",
    padding: "7px 27px 7px 15px",
    fontSize: "12px",
    boxSizing: "border-box",
    "&:focus": {
      borderRadius: "4px"
    }
  },
  select: {
    "&:focus": {
      backgroundColor: "#fff"
    }
  },
  icon: {
    color: "#3b3a3a",
    fontSize: "17px",
    right: "12px",
    top: "8px"
  }
})(Select);

export const PickerSelect = ({ date = new Date(Date.now()), onChange, type }) => {
  const value = type === "month" ? date.getMonth() : date.getFullYear();
  const options = type === "month" ? MONTH_OPTIONS : getYearOptions();
  const classes = useStyles();

  const handleChange = useCallback(
    ({ target: { value } }) => {
      const changeDate = type === "month" ? setMonth : setYear;
      onChange(changeDate(date, value));
    },
    [date, type, onChange]
  );

  return (
    <FormControl classes={{ root: classes.root }}>
      <StyledSelect
        value={value}
        onChange={handleChange}
        IconComponent={KeyboardArrowDownIcon}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left"
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.paperMenu,
            list: classes.listMenu
          }
        }}
      >
        {options.map(({ value, label }) => (
          <MenuItem
            key={value}
            value={value}
            classes={{ gutters: classes.listGutters, root: classes.listRoot }}
          >
            {label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

PickerSelect.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["month", "year"])
};
