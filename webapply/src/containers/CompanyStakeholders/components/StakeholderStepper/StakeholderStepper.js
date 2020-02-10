import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";

import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { SuccessFilledStakeholder } from "./../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import {
  sendProspectToAPIPromisify,
  setScreeningError
} from "../../../../store/actions/sendProspectToAPI";
import { useStep } from "../../../../components/StepComponent/useStep";
import {
  changeEditableStakeholder,
  setFillStakeholder,
  setEditStakeholder
} from "../../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { stakeholderScreeningStatus } from "../../../../constants";
import { quantityErrorSelector } from "../../../../store/selectors/stakeholder";

const timeInterval = 5000;

const StakeholderStepperComponent = ({
  id,
  index,
  firstName,
  middleName,
  lastName,
  fullName,
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  loading: isStatusLoading,
  changeEditableStakeholder,
  setFillStakeholder,
  setEditStakeholder,
  isTooManyStakeholders,
  setScreeningError,
  showAddButton,
  isEditInProgress
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [isDisplayFinalScreen, changeFinalScreenDisplay] = useState(false);
  const initialAvailableSteps = stakeHoldersSteps.map(item => item.step);
  const [step, handleSetStep, availableSteps, handleSetNextStep] = useStep(
    isEditInProgress ? null : STEP_1,
    isEditInProgress ? initialAvailableSteps : [STEP_1]
  );

  const handleContinue = event => () =>
    sendProspectToAPI(undefined, event).then(
      () => {
        if (isTooManyStakeholders) {
          setScreeningError(stakeholderScreeningStatus);
        }

        if (step === STEP_6) {
          setFillStakeholder(index, true);
          showAddButton();
        }
        isEditInProgress ? handleSetStep() : handleSetNextStep();
      },
      () => {}
    );
  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  useEffect(() => {
    if (step <= stakeHoldersSteps.length) return;
    changeFinalScreenDisplay(true);
    const interval = setInterval(() => {
      changeFinalScreenDisplay(false);
      changeEditableStakeholder();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [step, changeEditableStakeholder]);

  const handleDeleteStakeholder = useCallback(() => {
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  }, [setIsDisplayConfirmation, deleteStakeholder, id]);

  const deleteHandler = useCallback(
    () => (isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true)),
    [isDisplayConfirmation, handleDeleteStakeholder, setIsDisplayConfirmation]
  );

  const editHandler = useCallback(() => {
    showAddButton();
    changeEditableStakeholder("");
    setEditStakeholder(index, false);
  }, [showAddButton, changeEditableStakeholder, setEditStakeholder, index]);

  if (isDisplayFinalScreen) {
    return <SuccessFilledStakeholder name={fullName} />;
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={!isEditInProgress ? step !== STEP_1 : isStatusLoading}
      firstName={firstName}
      lastName={lastName}
      middleName={middleName}
      isStatusLoading={isStatusLoading}
      index={orderIndex}
      isEditInProgress={isEditInProgress}
      editHandler={editHandler}
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
            handleContinue={handleContinue(item.eventName)}
            stepForm={item.component}
          />
        ))}
      </div>

      {deleteStakeholder && (
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

const mapStateToProps = state => ({
  isStatusShown: state.stakeholders.isStatusShown,
  isTooManyStakeholders: quantityErrorSelector(state),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  changeEditableStakeholder,
  setFillStakeholder,
  setEditStakeholder,
  setScreeningError
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
