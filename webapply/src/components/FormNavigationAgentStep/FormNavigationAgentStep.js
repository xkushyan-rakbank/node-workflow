import React from "react";
import { Link } from "react-router-dom";
import cx from "classnames";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { useStyles } from "./styled";

export const FormNavigationAgentStep = ({
  path,
  title,
  activeStep,
  filled,
  isDisplayProgress = true
}) => {
  const classes = useStyles({ isDisplayProgress });

  return (
    <li
      className={cx([
        classes.stepItem,
        { [classes.activeStepItem]: activeStep },
        { [classes.filledStepItem]: filled }
      ])}
    >
      <Link to={path} className={classes.stepLink}>
        {(activeStep || filled) && (
          <span className={cx([classes.circle, { [classes.activeCircle]: activeStep }])}>
            {activeStep ? <ArrowForwardIcon className={classes.activeIcon} /> : null}
          </span>
        )}
        <div className="small-menu-hide">{title}</div>
      </Link>
    </li>
  );
};
