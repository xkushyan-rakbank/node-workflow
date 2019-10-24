import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckedIcon from "../../assets/icons/on.png";
import UncheckedIcon from "../../assets/icons/off.png";

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
