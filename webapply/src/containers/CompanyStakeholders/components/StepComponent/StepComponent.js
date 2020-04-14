import React from "react";

import { SectionTitle } from "../../../../components/SectionTitle";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { ICONS, Icon } from "../../../../components/Icons";

import { useStyles } from "./styled";

export const StepComponent = ({
  title,
  subTitle,
  isFilled = false,
  isActiveStep,
  index,
  clickHandler,
  setIsContinueDisabled,
  prospectInfo,
  handleContinue,
  createFormChangeHandler,
  stepForm: Form,
  id
}) => {
  const classes = useStyles();

  const renderTitle = () => {
    if (isActiveStep) {
      return (
        <SectionTitle title={title} subTitle={subTitle} classes={{ wrapper: classes.title }} />
      );
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
      <div className={classes.stepTitleWrapper} onClick={clickHandler}>
        {renderTitle()}
      </div>
      <div className={classes.formWrapper}>
        {isActiveStep && (
          <Form
            setIsContinueDisabled={setIsContinueDisabled}
            index={index}
            prospectInfo={prospectInfo}
            handleContinue={handleContinue}
            createFormChangeHandler={createFormChangeHandler}
            id={id}
          />
        )}
      </div>
    </>
  );
};
