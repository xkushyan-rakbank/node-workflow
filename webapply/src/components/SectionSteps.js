import React from "react";
import Stepper from "@material-ui/core/Stepper";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: "28px",
    color: "#434343;",
    margin: 0,
    marginBottom: "32px",
    [theme.breakpoints.only("sm", "lg")]: {
      fontSize: "1.5rem"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.75rem"
    }
  },
  box: {
    height: "auto",
    backgroundColor: "#F7F8F9",
    padding: "32px",
    borderRadius: "10px",
    marginBottom: "20px",
    gap: "unset",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      gap: "10px", 
    },

    "& .MuiStepper-root": {
      padding: "unset !important"
    }
  },
  stepper: {
    backgroundColor: "#F7F8F9"
  },
  step_label_root: {
    fontFamily: "DM Sans",
    fontWeight: 400,
    fontSize: "0.75rem",
    marginTop: "4px!important",
    color: "#1F1F1F",
    "&.MuiStepLabel-completed": {
      fontWeight: 400,
      color: "#1F1F1F"
    }
  },
  lineBetween: {
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)"
  },
  completedLabel: {
    fontWeight: 400,
    color: "#1F1F1F"
  }
}));

export const SectionSteps = () => {
  const steps = [
    "Your info",
    "Company info",
    "ID verification",
    "Business details",
    "Account preferences",
    "Review and submit"
  ];
  const classes = useStyles();
  const isVertical = useMediaQuery("(max-width: 767px") || window.innerWidth <= 768;
  return (
    <div>
      <div className={classes.box}>
        <h3 className={classes.title}>Your new account is just a few steps away...</h3>
        <Stepper
          className={classes.stepper}
          activeStep={(1, 2, 3, 4, 5, 6)}
          alternativeLabel={!isVertical}
          orientation={isVertical ? "vertical" : "horizontal"}
        >
          {steps.map(label => (
            <Step key={label}>
              <StepLabel
                icon={<CheckCircleOutlineIcon />}
                classes={{
                  label: classes.step_label_root,
                  alternativeLabel: classes.lineBetween,
                  completed: classes.completedLabel
                }}
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
