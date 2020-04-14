import React, { useState, useCallback } from "react";
import { connect } from "react-redux";

import { CompanyStakeholderCard } from "../../CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import { getIsSendingProspect } from "../../../../store/selectors/sendProspectToAPI";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import { changeEditableStakeholder } from "../../../../store/actions/stakeholders";
import { CONTINUE, SAVE } from "../../../../constants";
import { getEditableStakeholder } from "../../../../store/selectors/stakeholders";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useStep } from "../../../../hooks/useStep";
import { STEP_STATUS } from "../../../../constants";
import { SuccessFilledStakeholder } from "../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { FilledStakeholderCard } from "../../FilledStakeholderCard";

const timeInterval = 5000;

const StakeholderStepperComponent = ({
  stakeholder: { id: stakeholderId, fullName, kycDetails, accountSigningInfo },
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  isStatusLoading,
  changeEditableStakeholder,
  editableStakeholder
}) => {
  const isEditInProgress = editableStakeholder === stakeholderId;
  console.log(editableStakeholder, stakeholderId);
  const [isShowSuccessFilled, setIsShowSuccessFilled] = useState(false);
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler
  ] = useStep(`${COMPANY_STAKEHOLDER_ID}${stakeholderId}`, stakeHoldersSteps);

  const handleContinue = event => () => {
    sendProspectToAPI(CONTINUE, event, SAVE, {
      activeStep,
      flowId: `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`
    }).then(
      () => {
        if (activeStep === STEP_6) {
          setIsShowSuccessFilled(true);
          setTimeout(() => {
            setIsShowSuccessFilled(false);
            changeEditableStakeholder(null);
          }, timeInterval);
        }
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

  const deleteHandler = useCallback(() => {
    if (isDisplayConfirmation) {
      deleteStakeholder(stakeholderId);
      setIsDisplayConfirmation(false);
    } else {
      setIsDisplayConfirmation(true);
    }
  }, [stakeholderId, isDisplayConfirmation, setIsDisplayConfirmation, deleteStakeholder]);

  if (isShowSuccessFilled) {
    return <SuccessFilledStakeholder name={fullName} />;
  }

  if (!isEditInProgress) {
    return (
      <FilledStakeholderCard
        accountSigningInfo={accountSigningInfo}
        index={orderIndex}
        kycDetails={kycDetails}
        isEditDisabled={editableStakeholder !== null}
        stakeholderId={stakeholderId}
      />
    );
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={!isEditInProgress ? activeStep !== STEP_1 : isStatusLoading}
      isStatusLoading={isStatusLoading}
      index={orderIndex}
      isEditInProgress={isEditInProgress}
      editHandler={() => changeEditableStakeholder(null)}
      deleteHandler={deleteHandler}
      stakeholderId={stakeholderId}
      isDisplayConfirmation={isDisplayConfirmation}
    >
      {stakeHoldersSteps.map(item => (
        <StepComponent
          index={orderIndex}
          id={stakeholderId}
          key={item.step}
          title={item.title}
          subTitle={item.infoTitle}
          isActiveStep={activeStep === item.step}
          isFilled={availableSteps.some(
            step => step.step === item.step && step.status === STEP_STATUS.COMPLETED
          )}
          clickHandler={createSetStepHandler(item.step)}
          handleContinue={handleContinue(item.eventName)}
          createFormChangeHandler={createFormChangeHandler}
          stepForm={item.component}
        />
      ))}
    </CompanyStakeholderCard>
  );
};

const mapStateToProps = state => ({
  isStatusLoading: getIsSendingProspect(state),
  editableStakeholder: getEditableStakeholder(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  changeEditableStakeholder
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
