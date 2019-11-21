import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as CheckedIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/icons/off.svg";

export const useStyles = makeStyles({
  label: {
    fontFamily: "Open Sans",
    fontSize: "14px",
    color: "#373737"
  }
});

export const CustomCheckbox = ({ label, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{ label: classes.label }}
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
};
