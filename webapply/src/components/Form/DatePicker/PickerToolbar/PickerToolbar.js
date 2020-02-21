import React from "react";
import PropTypes from "prop-types";

import { PickerSelect } from "../PickerSelect/PickerSelect";
import { useStyles } from "./styled";

export const PickerToolbar = props => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.column}>
        <PickerSelect {...props} type="month" />
      </div>
      <div className={classes.column}>
        <PickerSelect {...props} type="year" />
      </div>
    </div>
  );
};

PickerToolbar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired
};
