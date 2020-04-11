import React, { useState, useCallback } from "react";
import { connect, useSelector } from "react-redux";

import { StakeholdersNameManager } from "../StakeholdersNameProvider/StakeholdersNameProvider";
import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import { getIsSendingProspect } from "../../../../store/selectors/sendProspectToAPI";
import { sendProspectToAPIPromisify } from "../../../../store/actions/sendProspectToAPI";
import {
  changeEditableStakeholder,
  setEditStakeholder
} from "../../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { CONTINUE, SAVE } from "../../../../constants";
import {
  getEditableStakeholder,
  getStakeholdersIds
} from "../../../../store/selectors/stakeholders";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useStep } from "../../../../hooks/useStep";
import { STEP_STATUS } from "../../../../constants";
import { SuccessFilledStakeholder } from "../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { FilledStakeholderCard } from "../../FilledStakeholderCard";

const timeInterval = 5000;

const StakeholderStepperComponent = ({
  id,
  key,
  index,
  fullName,
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  isStatusLoading,
  changeEditableStakeholder,
  setEditStakeholder,
  isEditInProgress,
  kycDetails,
  editableStakeholder,
  accountSigningInfo,
  setIsShowingAddButton
}) => {
  const classes = useStyles();
  const [isShowSuccessFilled, setIsShowSuccessFilled] = useState(false);
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const { id: stakeholderId = null } = useSelector(getStakeholdersIds)[index] || {};
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
          changeEditableStakeholder();
          setIsShowSuccessFilled(true);
          setIsShowingAddButton(false);
          setTimeout(() => {
            setIsShowSuccessFilled(false);
            setIsShowingAddButton(true);
          }, timeInterval);
        }
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);
  const handleDeleteStakeholder = useCallback(() => {
    StakeholdersNameManager && StakeholdersNameManager.deleteStakeholderFullName(id);
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  }, [setIsDisplayConfirmation, deleteStakeholder, id]);

  const deleteHandler = useCallback(
    () => (isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true)),
    [isDisplayConfirmation, handleDeleteStakeholder, setIsDisplayConfirmation]
  );

  const editHandler = useCallback(() => {
    setIsShowingAddButton(true);
    changeEditableStakeholder("");
    setEditStakeholder(index, false);
  }, [setIsShowingAddButton, changeEditableStakeholder, setEditStakeholder, index]);

  const handleEditCompleted = useCallback(
    index => {
      changeEditableStakeholder(index);
      setEditStakeholder(index, true);
    },
    [changeEditableStakeholder, setEditStakeholder]
  );

  if (isShowSuccessFilled) {
    return <SuccessFilledStakeholder name={fullName} />;
  }

  if (editableStakeholder !== index) {
    return (
      <FilledStakeholderCard
        key={key}
        accountSigningInfo={accountSigningInfo}
        changeEditableStep={handleEditCompleted}
        index={index}
        kycDetails={kycDetails}
        isEditDisabled={Number.isInteger(editableStakeholder)}
        id={id}
      />
    );
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={!isEditInProgress ? activeStep !== STEP_1 : isStatusLoading}
      isStatusLoading={isStatusLoading}
      index={orderIndex}
      isEditInProgress={isEditInProgress}
      editHandler={editHandler}
      id={id}
    >
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => (
          <StepComponent
            index={index}
            id={id}
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
  isStatusLoading: getIsSendingProspect(state),
  editableStakeholder: getEditableStakeholder(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  changeEditableStakeholder,
  setEditStakeholder
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
