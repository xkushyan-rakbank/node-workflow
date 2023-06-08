import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ICONS, Icon } from "../../Icons/Icon";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  },
  root: {}
}));

export const CustomRadioButton = ({
  label,
  customIcon = true,
  onSelect = () => {},
  classes: extendedClasses,
  ...rest
}) => {
  const classes = useStyles({ classes: extendedClasses });

  function CustomIconRadio(props) {
    return (
      <Radio
        onClick={onSelect}
        icon={<Icon name={ICONS.unCheckedRadio} alt="select icon" />}
        checkedIcon={<Icon name={ICONS.checkedRadio} alt="selected icon" />}
        {...rest}
      />
    );
  }

  return (
    <FormControlLabel
      classes={{ label: classes.label, root: classes.root }}
      control={
        customIcon ? (
          <CustomIconRadio />
        ) : (
          <Radio onClick={onSelect} disableRipple={true} {...rest} />
        )
      }
      label={label}
    />
  );
};
