import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { StepComponent as StepComponentFormik } from "../../components/StakeholderStepForms/StepComponent/StepComponent";
import SuccessFilledStakeholder from "../../components/StakeholderStepForms/SuccessFilledStakeholder/SuccessFilledStakeholder";
import StatusLoader from "../../components/StatusLoader";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_2, STEP_3, STEP_4 } from "./constants";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import {
  formatPersonalInformation,
  formatNationality,
  finishStakeholderEdit,
  handleChangeStep
} from "../../store/actions/stakeholders";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import { useStyles } from "./styled";

const StakeholderStepper = ({
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

  const renderContent = () => {
    return (
      <div className={classes.userInfo}>
        <div className={classes.nameField}>
          {firstName} {lastName}
        </div>
        {isStatusShown && <StatusLoader loading={isStatusLoading} />}
      </div>
    );
  };

  if (isDisplayFinalScreen) {
    return <SuccessFilledStakeholder name={`${firstName} ${lastName}`} />;
  }

  const cardProps = isStatusShown
    ? { content: renderContent(), firstName, lastName }
    : { firstName: "New Stakeholder", lastName: "" };

  const isFilled = itemStep => isNewStakeholder && completedStep >= itemStep - 1;
  const createSetStepHandler = item => () => {
    if (isFilled(item.step)) {
      changeStepHandler(item);
    }
  };

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

  return (
    <CompanyStakeholderCard {...cardProps} index={orderIndex}>
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => {
          if ([STEP_1, STEP_2, STEP_3].includes(item.step)) {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StakeholderStepper);
