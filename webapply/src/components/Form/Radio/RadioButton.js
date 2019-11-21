import React from "react";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import CheckedIcon from "../../../assets/icons/checked2x.png";
import UncheckedIcon from "../../../assets/icons/unchecked@2x.png";

import { useStyleRadioButton } from "./styled";

export const RadioButton = ({ label, ...rest }) => {
  const classes = useStyleRadioButton();

  return (
    <FormControlLabel
      label={label}
      classes={{ label: classes.radioLabel }}
      control={
        <Radio
          classes={{ root: classes.radio }}
          checkedIcon={<img src={CheckedIcon} alt="checked icon" />}
          icon={<img src={UncheckedIcon} alt="check icon" />}
          {...rest}
        />
      }
    />
  );
};
