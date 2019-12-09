import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ICONS, Icon } from "../../Icons/Icon";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  }
}));

export const CustomRadioButton = ({ label, onSelect = () => {}, ...rest }) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      classes={{ label: classes.label }}
      control={
        <Radio
          onClick={onSelect}
          icon={<Icon name={ICONS.unCheckedRadio} alt="select icon" />}
          checkedIcon={<Icon name={ICONS.checkedRadio} alt="selected icon" />}
          {...rest}
        />
      }
      label={label}
    />
  );
};
