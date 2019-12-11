import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

import { ICONS, Icon } from "../../../components/Icons/Icon";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  }
}));

export const CustomCheckbox = ({ label, onSelect = () => {}, ...rest }) => {
  const classes = useStyles();
  return (
    <FormControlLabel
      classes={{ label: classes.label }}
      control={
        <Checkbox
          onClick={onSelect}
          icon={<Icon name={ICONS.uncheckedIcon} alt="checked icon" />}
          checkedIcon={<Icon name={ICONS.checkedIcon} alt="unchecked icon" />}
          {...rest}
        />
      }
      label={label}
    />
  );
};
