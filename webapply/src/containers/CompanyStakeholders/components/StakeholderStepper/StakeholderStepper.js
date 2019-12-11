import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { SuccessFilledStakeholder } from "./../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1 } from "./../../constants";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { useStep } from "../../../../components/StepComponent/useStep";
import { useStyles } from "./styled";

const StakeholderStepperComponent = ({
  id,
  index,
  isNewStakeholder,
  firstName,
  lastName,
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  loading: isStatusLoading,
  changeEditableStakeholder
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [isDisplayFinalScreen, changeFinalScreenDisplay] = useState(false);
  const [step, availableSteps, handleSetNextStep, handleSetStep] = useStep(STEP_1);

  const handleContinue = () => sendProspectToAPI().then(() => handleSetNextStep(), () => {});
  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  useEffect(() => {
    if (step > stakeHoldersSteps.length) {
      changeFinalScreenDisplay(true);
      setInterval(() => {
        changeFinalScreenDisplay(false);
        changeEditableStakeholder();
      }, 5000);
    }
  }, [step]);

  const handleDeleteStakeholder = () => {
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  };

  const deleteHandler = () =>
    isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true);

  if (isDisplayFinalScreen) {
    return <SuccessFilledStakeholder name={`${firstName} ${lastName}`} />;
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={step !== STEP_1}
      firstName={firstName}
      lastName={lastName}
      isStatusLoading={isStatusLoading}
      index={orderIndex}
    >
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => (
          <StepComponent
            index={index}
            key={item.step}
            title={item.title}
            subTitle={item.infoTitle}
            isActiveStep={step === item.step}
            isFilled={availableSteps.includes(item.step)}
            clickHandler={createSetStepHandler(item.step)}
            handleContinue={handleContinue}
            stepForm={item.component}
          />
        ))}
      </div>

      {!isNewStakeholder && deleteStakeholder && (
        <div className={classes.footerPart}>
          <LinkButton
            title={
              isDisplayConfirmation ? "Are you sure? All Data will be lost" : "Delete Stakeholder"
            }
            className={classes.button}
            clickHandler={deleteHandler}
          />
        </div>
      )}
    </CompanyStakeholderCard>
  );
};

const mapStateToProps = (state, { changeEditableStakeholder }) => ({
  isStatusShown: state.stakeholders.isStatusShown,
  changeEditableStakeholder,
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
