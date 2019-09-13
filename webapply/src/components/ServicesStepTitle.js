import React from "react";
import cx from "classnames";
import { withStyles } from "@material-ui/core";
import SectionTitle from "./SectionTitle";
import DoneIcon from "./DoneIcon";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "space-between"
  },
  notActiveStep: {
    borderColor: "rgba(230, 230, 230, 0.5)",
    borderWidth: "1px 0",
    borderStyle: "solid",
    padding: "14px 0",
    marginTop: "-1px"
  },
  titleWrapper: { margin: 0 },
  activeTitle: {
    margin: "34px 0 11px"
  },
  disabled: {
    fontSize: "16px",
    color: "#263d4c",
    fontWeight: "normal",

    "&>div": {
      opacity: 0.5
    },
    "&>a": {
      opacity: 0.8,
      color: "#263d4c",
      textDecoration: "underline"
    }
  },
  icon: {
    opacity: 0.8
  }
};

const ServicesStepTitle = ({ step, activeStep, classes }) => {
  const doneStep = step.step < activeStep;
  const currentStep = activeStep === step.step;
  return (
    <div
      className={cx(
        classes.wrapper,
        currentStep ? classes.activeTitle : classes.notActiveStep
      )}
    >
      <SectionTitle
        title={
          doneStep ? <a href="#">{step.title}</a> : <div>{step.title}</div>
        }
        className={cx(classes.titleWrapper, {
          [classes.disabled]: !currentStep
        })}
      />
      {doneStep && <DoneIcon className={classes.icon} />}
    </div>
  );
};

export default withStyles(styles)(ServicesStepTitle);
