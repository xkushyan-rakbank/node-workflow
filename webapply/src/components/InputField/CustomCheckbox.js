import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckedIcon from "../../assets/icons/on.png";
import UncheckedIcon from "../../assets/icons/off.png";

const CustomCheckbox = props => {
  const {
    field: { name, onChange },
    id,
    label,
    style,
    value
  } = props;
  return (
    <FormControlLabel
      style={{ ...style }}
      control={
        <Checkbox
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          type="checkbox"
          icon={<img src={UncheckedIcon} alt="" />}
          checkedIcon={<img src={CheckedIcon} alt="" />}
        />
      }
      label={label}
    />
  );
};

export default CustomCheckbox;
