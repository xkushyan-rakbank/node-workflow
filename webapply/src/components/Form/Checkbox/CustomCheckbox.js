import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as CheckedIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/icons/off.svg";
import CheckedRadioIcon from "../../../assets/icons/checked2x.png";
import UncheckedRadioIcon from "../../../assets/icons/unchecked@2x.png";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  }
}));

export const CustomCheckbox = ({ label, onSelect = () => {}, type = "checkbox", ...rest }) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{ label: classes.label }}
      control={
        type !== "radio" ? (
          <Checkbox
            icon={<UncheckedIcon alt="unchecked" />}
            checkedIcon={<CheckedIcon alt="checkedIcon" />}
            onClick={onSelect}
            {...rest}
          />
        ) : (
          <Radio
            icon={<img src={UncheckedRadioIcon} alt="check icon" />}
            checkedIcon={<img src={CheckedRadioIcon} alt="checked icon" />}
            onClick={onSelect}
            {...rest}
          />
        )
      }
      label={label}
    />
  );
};
