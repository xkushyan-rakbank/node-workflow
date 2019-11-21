import React from "react";
import DoneIcon from "../../DoneIcon";
import SectionTitle from "../../SectionTitle";
import { LinkButton } from "../../Buttons/LinkButton";
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
      <div className={classes.formWrapper}>
        {isActiveStep && (
          <Form
            setIsContinueDisabled={setIsContinueDisabled}
            index={index}
            prospectInfo={prospectInfo}
            handleContinue={handleContinue}
          />
        )}
      </div>
    </>
  );
};
