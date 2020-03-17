import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControl } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import { getYearOptions } from "../utils";
import { MONTH_OPTIONS } from "./constants";
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

export const PickerSelect = ({ date, onChange, type, isFutureDisabled }) => {
  const classes = useStyles();
  const value = type === "month" ? date.getMonth() : date.getFullYear();
  const options = type === "month" ? MONTH_OPTIONS : getYearOptions(isFutureDisabled);

  const handleChange = event => {
    onChange(event.target.value);
  };

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
