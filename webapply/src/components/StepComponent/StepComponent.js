import React from "react";
import SectionTitle from "../SectionTitle";
import { LinkButton } from "../Buttons/LinkButton";
import { useStyles } from "./styled";
import { Icon, ICONS } from "../Icons";

export const StepComponent = ({
  title,
  subTitle,
  isFilled = false,
  isActiveStep,
  index,
  handleClick,
  prospectInfo,
  handleContinue,
  stepForm: Form
}) => {
  const classes = useStyles();

  const renderTitle = () => {
    if (isActiveStep) {
      return <SectionTitle title={title} subTitle={subTitle} className={classes.title} />;
    }
    return isFilled ? (
      <div className={classes.filledTitle}>
        <LinkButton title={title} className={classes.linkTitle} />
        <Icon name={ICONS.done} className={classes.doneIcon} />
      </div>
    ) : (
      <div className={classes.disabledStep}>{title}</div>
    );
  };

  return (
    <>
      <div className={classes.stepTitleWrapper} onClick={handleClick}>
        {renderTitle()}
      </div>
      {isActiveStep && (
        <Form index={index} prospectInfo={prospectInfo} handleContinue={handleContinue} />
      )}
    </>
  );
};
