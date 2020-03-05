import React, { useState, useCallback } from "react";
import { connect, useSelector } from "react-redux";

import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import {
  getIsCompanyStakeholder,
  getIsSendingProspect,
  getDatalist
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
import { getStakeholdersIds, stakeholdersState } from "../../../../store/selectors/stakeholder";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useStep } from "../../../../hooks/useStep";
import { STEP_STATUS } from "../../../../constants";
import { SuccessFilledStakeholder } from "../SuccessFilledStakeholder/SuccessFilledStakeholder";
import { FilledStakeholderCard } from "../FilledStakeholderCard/FilledStakeholderCard";

const timeInterval = 5000;

const StakeholderStepperComponent = ({
  id,
  key,
  index,
  fullName,
  firstName,
  middleName,
  lastName,
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  loading: isStatusLoading,
  changeEditableStakeholder,
  setFillStakeholder,
  setEditStakeholder,
  showAddButton,
  isCompanyStakeHolder,
  isEditInProgress,
  kycDetails,
  editableStakeholder,
  accountSigningInfo,
  datalist
}) => {
  const classes = useStyles();
  const [isShowSuccessFilled, setIsShowSuccessFilled] = useState(false);
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
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
          changeEditableStakeholder();
          setIsShowSuccessFilled(true);
          setTimeout(() => {
            setIsShowSuccessFilled(false);
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
        index={index}
        editDisabled={Number.isInteger(editableStakeholder)}
        changeEditableStep={handleEditCompleted}
        datalist={datalist}
        firstName={firstName}
        middleName={middleName}
        lastName={lastName}
        accountSigningInfo={accountSigningInfo}
        kycDetails={kycDetails}
      />
    );
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

const mapStateToProps = state => {
  const { editableStakeholder } = stakeholdersState(state);

  return {
    isStatusShown: state.stakeholders.isStatusShown,
    isCompanyStakeHolder: getIsCompanyStakeholder(state),
    loading: getIsSendingProspect(state),
    datalist: getDatalist(state),
    editableStakeholder
  };
};

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
