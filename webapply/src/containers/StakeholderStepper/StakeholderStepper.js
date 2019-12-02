import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { CompanyStakeholderCard } from "../../components/StakeholderStepForms/CompanyStakeholderCard/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { StepComponent as StepComponentFormik } from "../../components/StakeholderStepForms/StepComponent/StepComponent";
import SuccessFilledStakeholder from "../../components/StakeholderStepForms/SuccessFilledStakeholder/SuccessFilledStakeholder";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_4 } from "./constants";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import {
  formatPersonalInformation,
  formatNationality,
  finishStakeholderEdit,
  handleChangeStep
} from "../../store/actions/stakeholders";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import { useStyles } from "./styled";

const StakeholderStepperComponent = ({
  id,
  index,
  isNewStakeholder,
  firstName,
  lastName,
  step,
  isFinalScreenShown,
  isStatusShown,
  completedStep,
  orderIndex,
  deleteStakeholder,
  loading: isStatusLoading,
  sendProspectToAPI: sendProspect,
  formatPersonalInformation: personalInformationFormat,
  formatNationality: nationalityFormat,
  finishStakeholderEdit: finishEdition,
  handleChangeStep: changeStepHandler
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [isDisplayFinalScreen, changeFinalScreenDisplay] = useState(false);

  useEffect(() => {
    if (isFinalScreenShown) {
      changeFinalScreenDisplay(true);
      setInterval(() => {
        changeFinalScreenDisplay(false);
        finishEdition();
      }, 5000);
    }
  }, [isFinalScreenShown, finishEdition]);

  const handleDeleteStakeholder = () => {
    setIsDisplayConfirmation(false);
    deleteStakeholder(id);
  };

  const deleteHandler = () =>
    isDisplayConfirmation ? handleDeleteStakeholder() : setIsDisplayConfirmation(true);

  const createContinueHandler = itemStep => () => {
    switch (itemStep) {
      case STEP_1:
        return personalInformationFormat(index);
      case STEP_4:
        return nationalityFormat(index);
      default:
        return sendProspect();
    }
  };

  const isFilled = itemStep => isNewStakeholder && completedStep >= itemStep - 1;
  const createSetStepHandler = item => () => {
    if (isFilled(item.step)) {
      changeStepHandler(item);
    }
  };

  if (isDisplayFinalScreen) {
    return <SuccessFilledStakeholder name={`${firstName} ${lastName}`} />;
  }

  return (
    <CompanyStakeholderCard
      isStatusShown={isStatusShown}
      firstName={firstName}
      lastName={lastName}
      isStatusLoading={isStatusLoading}
      index={orderIndex}
    >
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => {
          if (item.step !== STEP_4) {
            return (
              <StepComponentFormik
                index={index}
                key={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                isActiveStep={step === item.step}
                isFilled={isFilled}
                clickHandler={createSetStepHandler(item)}
                handleContinue={createContinueHandler(item.step)}
                stepForm={item.component}
              />
            );
          }

          return (
            <StepComponent
              index={index}
              key={item.step}
              title={item.title}
              subTitle={item.infoTitle}
              activeStep={step === item.step}
              filled={isFilled}
              clickHandler={createSetStepHandler(item)}
              handleContinue={createContinueHandler(item.step)}
              stepForm={item.component}
            />
          );
        })}
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
  step: state.stakeholders.step,
  completedStep: state.stakeholders.completedStep,
  isFinalScreenShown: state.stakeholders.isFinalScreenShown,
  isStatusShown: state.stakeholders.isStatusShown,
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI,
  formatPersonalInformation,
  formatNationality,
  finishStakeholderEdit,
  handleChangeStep
};

export const StakeholderStepper = connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepperComponent);
