import React from "react";
import cx from "classnames";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { withStyles } from "@material-ui/core/styles";

import { Icon, ICONS } from "./Icons";

const style = {
  stepItem: {
    color: "#fff",
    listStyleType: "none",
    fontSize: "20px",
    lineHeight: "1.2",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    opacity: "0.5",
    paddingLeft: "44px",
    position: "relative",
    fontWeight: "400",
    "&:not(:last-child)": {
      marginBottom: "25px"
    },
    "& span": {
      position: "absolute",
      left: "0",
      marginLeft: "0"
    },
    "@media only screen and (max-width: 1300px)": {
      paddingLeft: "5px",
      fontSize: "16px",
      "& span": {
        left: "-20px"
      }
    }
  },
  doneIcon: {
    width: "24px"
  },
  activeStepItem: {
    opacity: "1",
    fontWeight: "600"
  }
};

const FormNavigationLink = props => {
  const { classes, title, activeStep, filled } = props;
  const activeClass = activeStep ? cx(classes.stepItem, classes.activeStepItem) : classes.stepItem;

  return (
    <li className={activeClass}>
      {activeStep ? (
        <span className="circle">
          <ArrowForwardIcon className={classes.icon} />
        </span>
      ) : filled ? (
        <span className="circle">
          <Icon name={ICONS.done} className={classes.doneIcon} />
        </span>
      ) : (
        ""
      )}
      {title}
    </li>
  );
};

export default withStyles(style)(FormNavigationLink);
