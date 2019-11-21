import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ReactComponent as CheckedIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/icons/off.svg";

export const CustomCheckbox = ({ label, ...rest }) => (
  <FormControlLabel
    control={
      <Checkbox
        icon={<UncheckedIcon alt="unchecked" />}
        checkedIcon={<CheckedIcon alt="checkedIcon" />}
        {...rest}
      />
    }
    label={label}
  />
);
