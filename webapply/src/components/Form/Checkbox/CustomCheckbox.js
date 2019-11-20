import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CheckedIcon from "../../../assets/icons/on.svg";
import UncheckedIcon from "../../../assets/icons/off.svg";

export const CustomCheckbox = ({ id, label, value, onChange }) => (
  <FormControlLabel
    control={
      <Checkbox
        id={id}
        value={value}
        onChange={onChange}
        icon={<img src={UncheckedIcon} alt="unchecked" />}
        checkedIcon={<img src={CheckedIcon} alt="checkedIcon" />}
      />
    }
    label={label}
  />
);
