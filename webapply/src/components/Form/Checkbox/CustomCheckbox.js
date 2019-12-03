import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/core/styles";

import { ICONS, Icon } from "../../../components/Icons/Icon";

import { ReactComponent as CheckedIcon } from "../../../assets/icons/on.svg";
import { ReactComponent as UncheckedIcon } from "../../../assets/icons/off.svg";

export const useStyles = makeStyles(theme => ({
  label: {
    fontSize: "14px",
    color: theme.palette.text.color
  },
  radioIcon: {
    width: "24px"
  }
}));

export const CustomCheckbox = ({ label, onSelect = () => {}, useRadioIcon, ...rest }) => {
  const classes = useStyles();
  const uncheckedRadioIcon = (
    <Icon name={ICONS.unCheckedRadio} alt="check icon" className={classes.radioIcon} />
  );
  const radioIconChecked = (
    <Icon name={ICONS.checkedRadio} alt="checked icon" className={classes.radioIcon} />
  );

  const InputField = useRadioIcon ? Radio : Checkbox;

  return (
    <FormControlLabel
      classes={{ label: classes.label }}
      control={
        <InputField
          icon={useRadioIcon ? uncheckedRadioIcon : <UncheckedIcon alt="unchecked" />}
          checkedIcon={useRadioIcon ? radioIconChecked : <CheckedIcon alt="checkedIcon" />}
          onClick={onSelect}
          {...rest}
        />
      }
      label={label}
    />
  );
};
