import React, { useEffect, useState, useCallback } from "react";
import { connect, useSelector } from "react-redux";

import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { SuccessFilledStakeholder } from "./../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6, NEXT } from "./../../constants";
import { getSendProspectToAPIInfo } from "../../../../store/selectors/appConfig";
import {
  sendProspectToAPIPromisify,
  setScreeningError
} from "../../../../store/actions/sendProspectToAPI";
import {
  changeEditableStakeholder,
  setFillStakeholder,
  setEditStakeholder
} from "../../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { stakeholderScreeningStatus } from "../../../../constants";
import { getStakeholdersIds, quantityErrorSelector } from "../../../../store/selectors/stakeholder";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useReduxStep } from "../../../../hooks/useReduxStep";

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
  const stakeholdersIds = useSelector(getStakeholdersIds);
  const [availableSteps, handleSetStep, handleSetNextStep] = useReduxStep(
    `${COMPANY_STAKEHOLDER_ID}${stakeholdersIds[index].id}`,
    STEP_1
  );
  const { id: activeStep = null } = availableSteps.find(step => step.isActive) || {};

  const handleContinue = event => () =>
    sendProspectToAPI(NEXT, event).then(
      () => {
        if (isTooManyStakeholders) {
          setScreeningError(stakeholderScreeningStatus);
        }

        if (activeStep === STEP_6) {
          setFillStakeholder(index, true);
          showAddButton();
        }
        isEditInProgress
          ? handleSetStep()
          : handleSetNextStep(activeStep, activeStep !== stakeHoldersSteps.length);
      },
      () => {}
    );
  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  useEffect(() => {
    if (activeStep <= stakeHoldersSteps.length) return;
    changeFinalScreenDisplay(true);
    const interval = setInterval(() => {
      changeFinalScreenDisplay(false);
      changeEditableStakeholder();
    }, timeInterval);
    return () => clearInterval(interval);
  }, [activeStep, changeEditableStakeholder]);

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
      isStatusShown={!isEditInProgress ? activeStep !== STEP_1 : isStatusLoading}
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
            isActiveStep={activeStep === item.step}
            isFilled={availableSteps.some(step => step.id === item.step && step.isCompleted)}
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
