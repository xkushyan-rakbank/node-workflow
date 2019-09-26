import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CheckedIcon from "../../assets/icons/checked.svg";
import UncheckedIcon from "../../assets/icons/unchecked.svg";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CustomCheckbox = props => {
  const { value, label, handleChange, checked } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<img src={UncheckedIcon} alt="" />}
          checkedIcon={<img src={CheckedIcon} alt="" />}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
