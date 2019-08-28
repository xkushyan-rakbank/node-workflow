import React from "react";
import cx from "classnames";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core/styles";

const style = {
  stepItem: {
    color: "#ffffff",
    listStyleType: "none",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    opacity: "0.5",
    "@media only screen and (max-width: 1100px)": {
      fontSize: "16px"
    },
    "&:not(:last-child)": {
      marginBottom: "30px"
    }
  },
  icon: {
    fontSize: "13px !important"
  },
  activeStepItem: {
    opacity: "1"
  }
};

const FormNavigationLink = props => {
  const { classes, title, activeStep, filled } = props;
  const activeClass = activeStep
    ? cx(classes.stepItem, classes.activeStepItem)
    : classes.stepItem;

  // console.log(filled);
  return (
    <li className={activeClass}>
      {title}

      {activeStep && (
        <span className="circle">
          <ArrowBackIcon className={classes.icon} />
        </span>
      )}

      {filled && (
        <span className="circle">
          <DoneIcon className={classes.icon} />
        </span>
      )}
    </li>
  );
};

export default withStyles(style)(FormNavigationLink);
