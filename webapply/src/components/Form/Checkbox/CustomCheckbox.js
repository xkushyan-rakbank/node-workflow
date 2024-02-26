import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

import { ICONS, Icon } from "../../../components/Icons/Icon";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  },
  checkbox: {},
  root: {
    marginRight: "auto"
  }
}));

export const CustomCheckbox = ({
  label,
  typeOfCheckbox = "checkbox",
  onSelect = () => {},
  classes: extendedClasses,
  ...rest
}) => {
  const classes = useStyles({ classes: extendedClasses });

  return (
    <FormControlLabel
      classes={{ label: classes.label, root: classes.root }}
      control={
        <Checkbox
          type={typeOfCheckbox}
          onClick={onSelect}
          classes={{ root: classes.checkbox }}
          icon={<Icon name={ICONS.uncheckedIcon} alt="checked icon" />}
          checkedIcon={
            <Icon name={ICONS.checkedIcon} alt="unchecked icon" width="26" height="26" />
          }
          {...rest}
        />
      }
      label={label}
    />
  );
};
