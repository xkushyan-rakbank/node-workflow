import React from "react";
import { withStyles } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import SectionTitle from "./SectionTitle";
import LinkButton from "./Buttons/LinkButton";
import { stakeHoldersSteps } from "../constants";
import FormWrapper from "./StepForms/FormWrapper";

const styles = {
  title: {
    fontSize: "16px",
    "&>div": {
      width: "4px"
    }
  },
  stepTitleWrapper: {
    padding: "13px 16px",
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    cursor: "pointer"
  },
  linkTitle: {
    padding: 0
  },
  iconWrapper: {
    border: "1.5px solid #517085",
    borderRadius: "50%",
    width: "22px",
    fontSize: "22px",
    color: "#517085",
    height: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  doneIcon: {
    fontSize: "13px"
  },
  filledTitle: {
    display: "flex",
    justifyContent: "space-between"
  },
  disabledStep: {
    opacity: 0.5,
    fontSize: "16px",
    color: "#263d4c"
  }
};

const StepComponent = props => {
  const {
    title,
    filled = false,
    active,
    classes,
    step,
    clickHandler,
    handleContinue
  } = props;
  const Form = stakeHoldersSteps[step - 1].component;
  const renderTitle = () => {
    if (active) {
      return <SectionTitle title={props.title} className={classes.title} />;
    }
    return filled ? (
      <div className={classes.filledTitle}>
        <LinkButton title={title} className={classes.linkTitle} />
        <div className={classes.iconWrapper}>
          <DoneIcon className={classes.doneIcon} />
        </div>
      </div>
    ) : (
      <div className={classes.disabledStep}>{title}</div>
    );
  };

  return (
    <>
      <div className={classes.stepTitleWrapper} onClick={clickHandler}>
        {renderTitle()}
      </div>
      {active && (
        <FormWrapper handleContinue={handleContinue}>
          <Form />
        </FormWrapper>
      )}
    </>
  );
};

export default withStyles(styles)(StepComponent);
