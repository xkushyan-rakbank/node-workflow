import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import get from "lodash/get";

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
import {
  changeEditableStakeholder,
  setFillStakeholder
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
  isNewStakeholder,
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
  isTooManyStakeholders,
  setScreeningError
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [isDisplayFinalScreen, changeFinalScreenDisplay] = useState(false);
  const stakeholdersIds = useSelector(getStakeholdersIds);
  const [availableSteps, handleSetStep, handleSetNextStep] = useReduxStep(
    `${COMPANY_STAKEHOLDER_ID}${stakeholdersIds[index].id}`
  );
  const activeStep = get(availableSteps.find(step => step.isActive), "id", null);

  const handleContinue = () =>
    sendProspectToAPI().then(
      () => {
        if (isTooManyStakeholders) {
          setScreeningError(stakeholderScreeningStatus);
        }

        if (activeStep === STEP_6) {
          setFillStakeholder(index, true);
        }
        handleSetNextStep(activeStep, activeStep !== stakeHoldersSteps.length);
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

  const handleDeleteStakeholder = () => {
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  };

  const deleteHandler = () =>
    isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true);

  if (isDisplayFinalScreen) {
    return <SuccessFilledStakeholder name={fullName} />;
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={activeStep !== STEP_1}
      firstName={firstName}
      lastName={lastName}
      middleName={middleName}
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
            isActiveStep={activeStep === item.step}
            isFilled={availableSteps.some(step => step.id === item.step && step.isCompleted)}
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

const mapStateToProps = state => ({
  isStatusShown: state.stakeholders.isStatusShown,
  isTooManyStakeholders: quantityErrorSelector(state),
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI: sendProspectToAPIPromisify,
  changeEditableStakeholder,
  setFillStakeholder,
  setScreeningError
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
