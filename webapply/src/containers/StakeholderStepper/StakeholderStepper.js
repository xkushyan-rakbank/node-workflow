import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import CompanyStakeholderCard from "../../components/CompanyStakeholderCard";
import StepComponent from "../../components/StepComponent";
import SuccessFilledStakeholder from "../../components/StakeholderStepForms/SuccessFilledStakeholder/SuccessFilledStakeholder";
import StatusLoader from "../../components/StatusLoader";
import LinkButton from "../../components/Buttons/LinkButton";
import { stakeHoldersSteps } from "./constants";
import { getSendProspectToAPIInfo } from "../../store/selectors/appConfig";
import {
  formatPersonalInformation,
  formatNationality,
  finishStakeholderEdit,
  handleChangeStep
} from "../../store/actions/stakeholders";
import { sendProspectToAPI } from "../../store/actions/sendProspectToAPI";
import styles from "./styled";

class StakeholderStepper extends React.Component {
  state = {
    confirmation: false
  };

  deleteHandler = () => {
    if (this.state.confirmation) {
      this.setState({ confirmation: false });
      this.props.deleteStakeholder();
    } else {
      this.setState({ confirmation: true });
    }
  };

  renderContent = () => {
    const { classes, firstName, lastName, loading, isStatusShown } = this.props;
    return (
      <div className={classes.userInfo}>
        <div className={classes.nameField}>{`${firstName} ${lastName}`}</div>
        {isStatusShown && <StatusLoader loading={loading} />}
      </div>
    );
  };

  render() {
    const {
      classes,
      index,
      isNewStakeholder,
      deleteStakeholder,
      firstName,
      lastName,
      step,
      isFinalScreenShown,
      isStatusShown,
      completedStep,
      orderIndex
    } = this.props;
    const { confirmation } = this.state;
    const fullName = `${firstName} ${lastName}`;

    if (isFinalScreenShown) {
      return (
        <SuccessFilledStakeholder name={fullName} hideForm={this.props.finishStakeholderEdit} />
      );
    }

    return (
      <CompanyStakeholderCard
        content={isStatusShown && this.renderContent()}
        firstName={isStatusShown ? firstName : "New Stakeholder"}
        lastName={isStatusShown ? lastName : ""}
        index={orderIndex}
      >
        <div className={classes.formContent}>
          {stakeHoldersSteps.map(item => {
            const isFilled = isNewStakeholder ? completedStep >= item.step - 1 : true;
            const setStep = () => (isFilled ? this.props.handleChangeStep(item) : {});

            const handleContinue = () => {
              switch (item.title) {
                case "Personal Information":
                  return this.props.formatPersonalInformation(index);
                case "Nationality":
                  return this.props.formatNationality(index);
                default:
                  return this.props.sendProspectToAPI();
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

        {!isNewStakeholder && !!deleteStakeholder && (
          <div className={classes.footerPart}>
            <LinkButton
              title={confirmation ? "Are you sure? All Data will be lost" : "Delete Stakeholder"}
              className={classes.button}
              clickHandler={this.deleteHandler}
            />
          </div>
        )}
      </CompanyStakeholderCard>
    );
  }
}

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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StakeholderStepper)
);
