import React from "react";
import cx from "classnames";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DoneIcon from "@material-ui/icons/Done";
import { withStyles } from "@material-ui/core/styles";

const style = {
  stepItem: {
    color: "#fff",
    listStyleType: "none",
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.2",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    opacity: "0.5",
    paddingLeft: "44px",
    position: "relative",
    fontWeight: "400",
    "@media only screen and (max-width: 1100px)": {
      fontSize: "16px"
    },
    "&:not(:last-child)": {
      marginBottom: "25px"
    },
    "& span": {
      position: "absolute",
      left: "0",
      marginLeft: "0"
    }
  },
  icon: {
    fontSize: "13px !important"
  },
  activeStepItem: {
    opacity: "1",
    fontWeight: "600"
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
      {activeStep ? (
        <span className="circle">
          <ArrowBackIcon className={classes.icon} />
        </span>
      ) : filled ? (
        <span className="circle">
          <DoneIcon className={classes.icon} />
        </span>
      ) : (
        ""
      )}
      {title}
    </li>
  );
};

export default withStyles(style)(FormNavigationLink);
