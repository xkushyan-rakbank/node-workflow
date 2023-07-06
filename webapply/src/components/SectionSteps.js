import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "20px",
    fontWeight: 500,
    lineHeight: "28px",
    color: "#1F1F1F"
  },
  box: {
    height: "170px",
    backgroundColor: "#F7F8F9",
    padding: "32px",
    borderRadius: "10px",
    marginBottom: "30px",
    gap: "32px"
  },
  stepper: {
    backgroundColor: "#F7F8F9",
    padding: "0px"
  },
  step_label_root: {
    fontSize: "12px"
  }
}));

export const SectionSteps = () => {
  const steps = [
    "Application",
    "Instant account number",
    "Quick approvals",
    "Signature varification",
    "Account activation"
  ];
  const classes = useStyles();
  return (
    <div>
      <div className={classes.box}>
        <h3 className={classes.title}>Your new account is just a few steps away...</h3>
        <Stepper className={classes.stepper} activeStep={(1, 2, 3, 4, 5)} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel
                icon={<CheckCircleOutlineIcon />}
                classes={{ label: classes.step_label_root }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
};