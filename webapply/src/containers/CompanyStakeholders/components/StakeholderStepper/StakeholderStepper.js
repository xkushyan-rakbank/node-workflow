import React, { useState, useCallback, useContext } from "react";
import { connect, useSelector } from "react-redux";

import { StakeholdersNamesContext } from "../FullNameProvider/FullNameProvider";
import { CompanyStakeholderCard } from "./../CompanyStakeholderCard/CompanyStakeholderCard";
import { StepComponent } from "./../StepComponent/StepComponent";
import { LinkButton } from "../../../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_6 } from "./../../constants";
import { getIsSendingProspect, getDatalist } from "../../../../store/selectors/appConfig";
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
import { CONTINUE } from "../../../../constants";
import {
  getStakeholdersIds,
  stakeholdersState,
  stakeholdersSelector
} from "../../../../store/selectors/stakeholder";
import { COMPANY_STAKEHOLDER_ID } from "./../../constants";
import { useStep } from "../../../../hooks/useStep";
import { STEP_STATUS, MAX_STAKEHOLDERS_LENGTH } from "../../../../constants";
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
  isEditInProgress,
  kycDetails,
  editableStakeholder,
  accountSigningInfo,
  datalist,
  setIsShowingAddButton,
  stakeholders
}) => {
  const classes = useStyles();
  const [isShowSuccessFilled, setIsShowSuccessFilled] = useState(false);
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const { id: stakeholderId = null } = useSelector(getStakeholdersIds)[index] || {};
  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useStep(
    `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
    stakeHoldersSteps
  );
  const { deleteFullName } = useContext(StakeholdersNamesContext);

  const setIsDisplayAddButton = useCallback(() => {
    setIsShowingAddButton(stakeholders.length < MAX_STAKEHOLDERS_LENGTH);
  }, [setIsShowingAddButton, stakeholders.length]);

  const handleContinue = event => () => {
    sendProspectToAPI(CONTINUE, event).then(
      () => {
        if (activeStep === STEP_6) {
          setFillStakeholder(index, true);
          changeEditableStakeholder();
          setIsShowSuccessFilled(true);
          setIsShowingAddButton(false);
          setTimeout(() => {
            setIsShowSuccessFilled(false);
            setIsDisplayAddButton();
          }, timeInterval);
        }
        handleSetNextStep(activeStep);
      },
      () => {}
    );
  };

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);
  const handleDeleteStakeholder = useCallback(() => {
    deleteFullName(id);
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  }, [setIsDisplayConfirmation, deleteStakeholder, id]);

  const deleteHandler = useCallback(
    () => (isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true)),
    [isDisplayConfirmation, handleDeleteStakeholder, setIsDisplayConfirmation]
  );

  const editHandler = useCallback(() => {
    setIsDisplayAddButton();
    changeEditableStakeholder("");
    setEditStakeholder(index, false);
  }, [setIsDisplayAddButton, changeEditableStakeholder, setEditStakeholder, index]);

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
        id={id}
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
    stakeholders: stakeholdersSelector(state),
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
