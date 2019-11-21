import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ReactComponent as CheckedIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/icons/off.svg";

export const CustomCheckbox = ({ label, valueData, onChange, name }) => (
  <FormControlLabel
    control={
      <Checkbox
        name={name}
        value={valueData}
        onChange={onChange}
        icon={<UncheckedIcon alt="unchecked" />}
        checkedIcon={<CheckedIcon alt="checkedIcon" />}
      />
    }
    label={label}
  />
);
