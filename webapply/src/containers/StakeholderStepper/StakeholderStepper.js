import React, { useState } from "react";
import { connect } from "react-redux";
import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
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
      props.deleteStakeholder();
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

  return (
    <CompanyStakeholderCard {...cardProps} index={orderIndex}>
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => {
          const isFilled = isNewStakeholder ? completedStep >= item.step - 1 : true;
          const setStep = () => (isFilled ? props.handleChangeStep(item) : {});

          const handleContinue = () => {
            switch (item.step) {
              case STEP_1:
                return props.formatPersonalInformation(index);
              case STEP_4:
                return props.formatNationality(index);
              default:
                return props.sendProspectToAPI();
            }
          };

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
