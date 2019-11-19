import React from "react";
import DoneIcon from "../../DoneIcon";
import SectionTitle from "../../SectionTitle";
import LinkButton from "../../Buttons/LinkButton";
import { useStyles } from "./styled";

export const StepComponent = props => {
  const classes = useStyles();
  const {
    title,
    filled = false,
    activeStep,
    step,
    index,
    clickHandler,
    steps,
    setIsContinueDisabled,
    prospectInfo,
    handleContinue
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
        <Form
          setIsContinueDisabled={setIsContinueDisabled}
          index={index}
          prospectInfo={prospectInfo}
          handleContinue={handleContinue}
        />
      )}
    </>
  );
};
