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
  page,
  step,
  handleClick,
  stepForm: Form,
  ...props
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
      <div className={classes.formWrapper}>{isActiveStep && <Form index={index} {...props} />}</div>
    </>
  );
};
