import React from "react";
import { withStyles } from "@material-ui/core";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

import CheckedIcon from "../../assets/icons/checked2x.png";
import UncheckedIcon from "../../assets/icons/unchecked@2x.png";

const style = {
  radio: {
    "& img": {
      width: "24px",
      height: "24px"
    }
  },
  radioLabel: {
    fontFamily: "Open Sans",
    fontSize: "14px"
  }
};

const RadioButton = props => {
  const { value, label, classes } = props;

  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          classes={{ root: classes.radio }}
          checkedIcon={<img src={CheckedIcon} alt="checked icon" />}
          icon={<img src={UncheckedIcon} alt="check icon" />}
        />
      }
      classes={{ label: classes.radioLabel }}
      label={label}
    />
  );
};

export default withStyles(style)(RadioButton);
