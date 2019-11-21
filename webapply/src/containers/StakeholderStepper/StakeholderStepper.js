import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { StepComponent as StepComponentFormik } from "../../components/StakeholderStepForms/StepComponent/StepComponent";
import SuccessFilledStakeholder from "../../components/StakeholderStepForms/SuccessFilledStakeholder/SuccessFilledStakeholder";
import StatusLoader from "../../components/StatusLoader";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { stakeHoldersSteps, STEP_1, STEP_2, STEP_4 } from "./constants";
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
  loading: isStatusLoading,
  finishStakeholderEdit,
  ...props
}) => {
  const classes = useStyles();
  const [isDisplayConfirmation, setIsDisplayConfirmation] = useState(false);
  const [finalScreenIsShown, changeFinalScreenDisplay] = React.useState(false);

  useEffect(() => {
    if (isFinalScreenShown) {
      changeFinalScreenDisplay(true);
      setInterval(() => {
        changeFinalScreenDisplay(false);
        finishStakeholderEdit();
      }, 5000);
    }
  }, [isFinalScreenShown, finishStakeholderEdit]);

  const deleteHandler = () => {
    if (isDisplayConfirmation) {
      setIsDisplayConfirmation(false);
      props.deleteStakeholder(id);
    } else {
      setIsDisplayConfirmation(true);
    }
  };

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

  if (finalScreenIsShown) {
    return <SuccessFilledStakeholder name={`${firstName} ${lastName}`} />;
  }

  const cardProps = isStatusShown
    ? { content: renderContent(), firstName, lastName }
    : { firstName: "New Stakeholder", lastName: "" };

  const isFilled = itemStep => isNewStakeholder && completedStep >= itemStep - 1;
  const createSetStepHandler = item => () => {
    if (isFilled(item.step)) {
      props.handleChangeStep(item);
    }
  };

  const createContinueHandler = itemStep => () => {
    switch (itemStep) {
      case STEP_1:
        return props.formatPersonalInformation(index);
      case STEP_4:
        return props.formatNationality(index);
      default:
        return props.sendProspectToAPI();
    }
  };

  return (
    <CompanyStakeholderCard {...cardProps} index={orderIndex}>
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => {
          const stepIndex = item.step - 1;
          const stepForm = stakeHoldersSteps[stepIndex].component;

          if ([STEP_1, STEP_2].includes(item.step)) {
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
                stepForm={stepForm}
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
              stepForm={stepForm}
            />
          );
        })}
      </div>

      {!isNewStakeholder && props.deleteStakeholder && (
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
