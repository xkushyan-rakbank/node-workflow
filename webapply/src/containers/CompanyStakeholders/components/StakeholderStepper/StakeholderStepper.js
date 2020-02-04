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
  setFillStakeholder
} from "../../../../store/actions/stakeholders";
import { useStyles } from "./styled";
import { stakeholderScreeningStatus } from "../../../../constants";
import { quantityErrorSelector } from "../../../../store/selectors/stakeholder";
import { sendGoogleAnalyticsMetrics } from "../../../../store/actions/googleAnalytics";

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
  const [step, handleSetStep, availableSteps, handleSetNextStep] = useStep(STEP_1);

  const handleContinue = useCallback(
    event => () => {
      sendProspectToAPI().then(
        () => {
          if (isTooManyStakeholders) {
            setScreeningError(stakeholderScreeningStatus);
          }

          if (step === STEP_6) {
            setFillStakeholder(index, true);
          }
          handleSetNextStep();
        },
        () => {}
      );
      sendGoogleAnalyticsMetrics(event);
    },
    [
      handleSetNextStep,
      setFillStakeholder,
      setScreeningError,
      sendProspectToAPI,
      isTooManyStakeholders,
      step,
      index
    ]
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
      isStatusShown={step !== STEP_1}
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
            isActiveStep={step === item.step}
            isFilled={availableSteps.includes(item.step)}
            clickHandler={createSetStepHandler(item.step)}
            handleContinue={handleContinue(item.event_name)}
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
  setScreeningError,
  sendGoogleAnalyticsMetrics
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
