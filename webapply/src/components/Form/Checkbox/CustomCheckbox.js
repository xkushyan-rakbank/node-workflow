import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  }
}));

export const CustomCheckbox = ({ label, onSelect = () => {}, useRadioIcon, ...rest }) => {
  const classes = useStyles();
  const InputField = useRadioIcon ? Radio : Checkbox;

  return (
    <FormControlLabel
      classes={{ label: classes.label }}
      control={<InputField onClick={onSelect} {...rest} />}
      label={label}
    />
  );
};
