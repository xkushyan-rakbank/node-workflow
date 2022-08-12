import React, { useState, useCallback, useEffect, useRef } from "react";
import { CONTINUE, SAVE } from "../../../constants";
import { stakeHoldersSteps, STEP_6, STEP_1 } from "../constants";
import { COMPANY_STAKEHOLDER_ID } from "../constants";
import { STEP_STATUS } from "../../../constants";
import { useStep } from "../../../utils/useStep";
import { StepComponent } from "../components/StepComponent/StepComponent";
import { CompanyStakeholderCard } from "../CompanyStakeholderCard";
import { SuccessFilledStakeholder } from "../components/SuccessFilledStakeholder/SuccessFilledStakeholder";
import { FilledStakeholderCard } from "../FilledStakeholderCard";

const timeInterval = 5000;

export const StakeholderStepperContainer = ({
  stakeholder: {
    id: stakeholderId,
    fullName,
    accountSigningInfo: { authorityType },
    kycDetails,
    signatoryCompanyInfo
  },
  stakeholder,
  orderIndex,
  deleteStakeholder,
  sendProspectToAPI,
  changeEditableStakeholder,
  editableStakeholder
}) => {
  const [isShowSuccessFilled, setIsShowSuccessFilled] = useState(false);
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [
    activeStep,
    availableSteps,
    handleSetStep,
    handleSetNextStep,
    createFormChangeHandler,
    resetStakeholderSteps
  ] = useStep(
    `${COMPANY_STAKEHOLDER_ID}${stakeholderId}`,
    stakeHoldersSteps[kycDetails.isShareholderACompany]
  );
  const isShareholderACompanyRef = useRef(kycDetails.isShareholderACompany);

  useEffect(() => {
    if (isShareholderACompanyRef.current !== kycDetails.isShareholderACompany) {
      resetStakeholderSteps();
      isShareholderACompanyRef.current = kycDetails.isShareholderACompany;
    }
  }, [kycDetails.isShareholderACompany]);

  const isEditInProgress = editableStakeholder === stakeholderId;
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
        } else if (activeStep === STEP_1 && kycDetails.isShareholderACompany) {
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

  const cancelEditHandler = () => changeEditableStakeholder(null);

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
    return (
      <SuccessFilledStakeholder
        name={kycDetails.isShareholderACompany ? signatoryCompanyInfo.companyName : fullName}
      />
    );
  }

  if (!isEditInProgress) {
    return (
      <FilledStakeholderCard
        authorityTypeValue={authorityType}
        index={orderIndex}
        kycDetails={kycDetails}
        isEditDisabled={false}
        stakeholderId={stakeholderId}
        stakeholder={stakeholder}
      />
    );
  }

  return (
    <CompanyStakeholderCard
      index={orderIndex}
      cancelEditHandler={cancelEditHandler}
      deleteHandler={deleteHandler}
      stakeholderId={stakeholderId}
      stakeholder={stakeholder}
      isDisplayConfirmation={isDisplayConfirmation}
    >
      {stakeHoldersSteps[kycDetails.isShareholderACompany].map(item => (
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
          isShareholderACompany={kycDetails.isShareholderACompany}
          stepForm={item.component}
          stakeholder={stakeholder}
          step={item.step}
        />
      ))}
    </CompanyStakeholderCard>
  );
};
