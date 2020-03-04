import React, { useState, useCallback } from "react";
import { connect, useSelector } from "react-redux";

import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { SuccessFilledStakeholder } from "./../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import {
  getIsCompanyStakeholder,
  getIsSendingProspect
} from "../../../../store/selectors/appConfig";
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
import { CONTINUE, NEXT } from "../../../../constants";
import { getStakeholdersIds } from "../../../../store/selectors/stakeholder";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useStep } from "../../../../hooks/useStep";
import { STEP_STATUS } from "../../../../constants";

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
  showAddButton,
  isCompanyStakeHolder,
  isEditInProgress
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [isDisplayFinalScreen, changeFinalScreenDisplay] = useState(false);
  const { id: stakeholderId = null } = useSelector(getStakeholdersIds)[index] || {};
  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useStep(
    `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
    stakeHoldersSteps
  );

  const handleContinue = event => () => {
    const saveType = activeStep === STEP_1 && isCompanyStakeHolder ? NEXT : CONTINUE;

    sendProspectToAPI(saveType, event).then(
      () => {
        if (activeStep === STEP_6) {
          setFillStakeholder(index, true);
          showAddButton();
          changeFinalScreenDisplay(true);
          setTimeout(() => {
            changeFinalScreenDisplay(false);
            changeEditableStakeholder();
          }, timeInterval);
        }
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

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
            isFilled={availableSteps.some(
              step => step.step === item.step && step.status === STEP_STATUS.COMPLETED
            )}
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
  isCompanyStakeHolder: getIsCompanyStakeholder(state),
  loading: getIsSendingProspect(state)
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
