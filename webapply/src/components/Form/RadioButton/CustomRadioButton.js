import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { ICONS, Icon } from "../../Icons/Icon";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  },
  root: {},
  parent: {}
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
        color={props.color}
        onClick={onSelect}
        icon={<Icon name={ICONS.unCheckedRadio} alt="select icon" />}
        checkedIcon={<Icon name={ICONS.checkedRadio} alt="selected icon" />}
        {...rest}
      />
    );
  }

  const CustomColorRadio = withStyles({
    root: {
      color: "primary",
      "&$checked": {
        color: rest.color
      }
    },
    checked: {}
  })(props => <Radio color="primary" {...props} />);

  return (
    <FormControlLabel
      classes={{ label: classes.label, root: classes.root, parent: "" }}
      control={
        customIcon ? (
          <CustomIconRadio />
        ) : (
          <CustomColorRadio onClick={onSelect} disableRipple={true} {...rest} />
        )
      }
      label={label}
    />
  );
};
