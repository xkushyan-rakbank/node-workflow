import React from "react";
import cx from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import { withStyles } from "@material-ui/core/styles";

const style = {
  selectField: {
    "& svg": {
      fontSize: " 18px",
      color: " #000",
      top: " 50%",
      transform: " translate(0, -50%)"
    }
  },
  selectFieldCombined: {
    width: "90px !important",
    "& fieldset": {
      borderColor: "rgba(194, 194, 194, 0.56)"
    },
    "& svg": {
      right: "10px"
    }
  }
};

// Need to change this component(Ivan)
const SelectCombined = props => {
  const { field, label, options, classes, ...rest } = props;
  return (
    <Select
      {...field}
      {...rest}
      input={<OutlinedInput />}
      IconComponent={KeyboardArrowDownIcon}
      className={cx(classes.selectField, classes.selectFieldCombined)}
    >
      {options.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default withStyles(style)(SelectCombined);
