import React from "react";
import cx from "classnames";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useStyles } from "./styled";
import { Icon, ICONS } from "../Icons";

export const FormNavigationStep = ({ title, activeStep, filled }) => {
  const classes = useStyles();

  return (
    <li
      className={cx([
        classes.stepItem,
        { [classes.activeStepItem]: activeStep },
        { [classes.filledStepItem]: filled }
      ])}
    >
      {(activeStep || filled) && (
        <span className={cx([classes.circle, { [classes.activeCircle]: activeStep }])}>
          {activeStep ? <ArrowForwardIcon /> : filled ? <Icon name={ICONS.done} /> : null}
        </span>
      )}
      {title}
    </li>
  );
};
