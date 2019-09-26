import React from "react";
import { withStyles } from "@material-ui/core";
import LinkButton from "./Buttons/LinkButton";

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px 0"
  },
  icon: {
    width: "40px",
    height: "40px",
    border: "solid 1.5px #e9e9ed",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "0 20px"
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  editButton: {
    margin: "0 40px 0 auto"
  }
};

const ServicesStepTitle = ({ step, activeStep, classes, setStep }) => {
  const doneStep = step.step < activeStep;
  const editStep = () => setStep(step.step);
  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        <img src={step.icon} alt="" />
      </div>
      <div className={classes.title}>{step.title}</div>

      {doneStep && (
        <LinkButton className={classes.editButton} clickHandler={editStep} />
      )}
    </div>
  );
};

export default withStyles(styles)(ServicesStepTitle);
