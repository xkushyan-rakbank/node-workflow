import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CheckedIcon from "../../assets/icons/on.svg";
import UncheckedIcon from "../../assets/icons/off.svg";

const CustomCheckbox = ({ id, label, style, value, field }) => {
  const { name, onChange } = field;

  return (
    <FormControlLabel
      style={{ ...style }}
      control={
        <Checkbox
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          icon={<img src={UncheckedIcon} alt="unchecked" />}
          checkedIcon={<img src={CheckedIcon} alt="checkedIcon" />}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
