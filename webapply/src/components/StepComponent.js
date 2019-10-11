import React from "react";
import { withStyles } from "@material-ui/core";
import DoneIcon from "./DoneIcon";
import SectionTitle from "./SectionTitle";
import LinkButton from "./Buttons/LinkButton";
import FormWrapper from "./StakeholderStepForms/FormWrapper";

const styles = {
  title: {
    paddingTop: "20px",
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
    activeStep,
    classes,
    step,
    index,
    clickHandler,
    handleContinue,
    steps,
    hideContinue,
    isContinueDisabled,
    setIsContinueDisabled,
    prospectInfo = []
  } = props;
  const Form = steps[step - 1].component;

  const renderTitle = () => {
    if (activeStep) {
      return (
        <SectionTitle title={props.title} subTitle={props.subTitle} className={classes.title} />
      );
    }
    return filled ? (
      <div className={classes.filledTitle}>
        <LinkButton title={title} className={classes.linkTitle} />
        <DoneIcon />
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
      {activeStep && (
        <FormWrapper
          isContinueDisabled={isContinueDisabled}
          handleContinue={handleContinue}
          hideContinue={hideContinue}
        >
          <Form
            setIsContinueDisabled={setIsContinueDisabled}
            index={index}
            prospectInfo={prospectInfo}
          />
        </FormWrapper>
      )}
    </>
  );
};

export default withStyles(styles)(StepComponent);
