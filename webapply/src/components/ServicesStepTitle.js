import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { LinkButton } from "./Buttons/LinkButton";

const useStyles = makeStyles(theme => ({
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
    alignItems: "center",
    margin: "0 20px",
    "&>img": {
      height: "fit-content"
    }
  },
  title: {
    fontSize: "20px",
    fontWeight: 600,
    color: theme.palette.text.color,
    display: "flex",
    flexDirection: "column",
    fontFamily: "Open Sans"
  },
  editButton: {
    margin: "0 40px 0 auto"
  }
}));

const ServicesStepTitle = ({ step, activeStep, createClickHandler }) => {
  const doneStep = step.step < activeStep;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.icon}>
        <img src={step.icon} alt="" />
      </div>
      <div className={classes.title}>{step.title}</div>

      {doneStep && (
        <LinkButton className={classes.editButton} clickHandler={createClickHandler(step.step)} />
      )}
    </div>
  );
};

export default ServicesStepTitle;
