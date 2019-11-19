import React, { useState } from "react";
import { connect } from "react-redux";
import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import { StepComponent as StepComponentFormik } from "../../components/StakeholderStepForms/StepComponent/StepComponent";
import SuccessFilledStakeholder from "../../components/StakeholderStepForms/SuccessFilledStakeholder/SuccessFilledStakeholder";
import StatusLoader from "../../components/StatusLoader";
import LinkButton from "../../components/Buttons/LinkButton";
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

const StakeholderStepper = props => {
  const classes = useStyles();
  const [confirmation, setConfirmation] = useState(false);

  const {
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
    loading,
    finishStakeholderEdit
  } = props;

  const deleteHandler = () => {
    if (confirmation) {
      setConfirmation(false);
      props.deleteStakeholder(id);
    } else {
      setConfirmation(true);
    }
  };

  const renderContent = () => {
    return (
      <div className={classes.userInfo}>
        <div className={classes.nameField}>{`${firstName} ${lastName}`}</div>
        {isStatusShown && <StatusLoader loading={loading} />}
      </div>
    );
  };

  if (isFinalScreenShown) {
    return (
      <SuccessFilledStakeholder
        name={`${firstName} ${lastName}`}
        hideForm={finishStakeholderEdit}
      />
    );
  }

  const cardProps = isStatusShown
    ? { content: renderContent(), firstName, lastName }
    : { firstName: "New Stakeholder", lastName: "" };

  const isFilled = itemStep => !isNewStakeholder || completedStep >= itemStep - 1;
  const handleSetStep = item => (isFilled(item.step) ? props.handleChangeStep(item) : {});
  const continueHandler = (itemStep, index) => {
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
          const setStep = () => handleSetStep(item);
          const handleContinue = () => continueHandler(item.step, index);

          if (item.step === STEP_1) {
            return (
              <StepComponentFormik
                index={index}
                key={item.step}
                steps={stakeHoldersSteps}
                step={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                activeStep={step === item.step}
                filled={isFilled}
                clickHandler={setStep}
                handleContinue={handleContinue}
              />
            );
          }

          return (
            <StepComponent
              index={index}
              key={item.step}
              steps={stakeHoldersSteps}
              step={item.step}
              title={item.title}
              subTitle={item.infoTitle}
              activeStep={step === item.step}
              filled={isFilled}
              clickHandler={setStep}
              handleContinue={handleContinue}
            />
          );
        })}
      </div>

      {!isNewStakeholder && !!props.deleteStakeholder && (
        <div className={classes.footerPart}>
          <LinkButton
            title={confirmation ? "Are you sure? All Data will be lost" : "Delete Stakeholder"}
            className={classes.button}
            clickHandler={deleteHandler}
          />
        </div>
      )}
    </CompanyStakeholderCard>
  );
};

const mapStateToProps = state => {
  return {
    step: state.stakeholders.step,
    completedStep: state.stakeholders.completedStep,
    isFinalScreenShown: state.stakeholders.isFinalScreenShown,
    isStatusShown: state.stakeholders.isStatusShown,
    ...getSendProspectToAPIInfo(state)
  };
};

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
