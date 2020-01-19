import React from "react";
import cx from "classnames";
import { useStyles } from "./styled";

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
        <span
          className={cx([
            classes.circle,
            { [classes.activeCircle]: activeStep },
            { [classes.filledCircle]: filled }
          ])}
        />
      )}
      {title}
    </li>
  );
};
