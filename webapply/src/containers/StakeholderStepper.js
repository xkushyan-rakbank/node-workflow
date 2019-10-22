import React from "react";
import { withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import SuccessFilledStakeholder from "../components/StakeholderStepForms/SuccessFilledStakeholder";
import StatusLoader from "../components/StatusLoader";
import LinkButton from "../components/Buttons/LinkButton";
import { stakeHoldersSteps } from "../constants";
import { getSendProspectToAPIInfo } from "../store/selectors/appConfig";
import { formatPersonalInformation, formatNationality } from "../store/actions/stakeholders";
import { sendProspectToAPI } from "../store/actions/sendProspectToAPI";

const styles = {
  title: {
    marginLeft: "24px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  formContent: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)"
  },
  footerPart: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)",
    opacity: 0.62,
    lineHeight: 1.5,
    textAlign: "center",
    padding: "12px"
  },
  button: {
    fontSize: "16px",
    color: "#c00000"
  },
  userInfo: {
    display: "flex",
    flex: 1
  },
  nameField: {
    fontSize: "20px",
    fontWeight: "600",
    lineHeight: "1.4",
    marginLeft: "20px"
  }
};

class StakeholderStepper extends React.Component {
  state = {
    isFinalScreenShown: false,
    step: 1,
    confirmation: false,
    isStatusShown: false
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.resetStep && this.props.resetStep) {
      this.setState(state => {
        const nextStep = state.step + 1;

        return {
          step: nextStep,
          completedStep: state.step,
          isFinalScreenShown: state.step === stakeHoldersSteps.length,
          isStatusShown: true
        };
      });
    }
  }

  finishStakeholderCreation = () => {
    this.props.hideForm();
    this.setState({ isFinalScreenShown: false });
  };

  deleteHandler = () => {
    if (this.state.confirmation) {
      this.setState({ confirmation: false });
      this.props.deleteStakeholder();
    } else {
      this.setState({ confirmation: true });
    }
  };

  setStep = item => {
    if (!this.props.showNewStakeholder || this.state.completedStep > item.step) {
      this.setState({ step: item.step });
    }
  };

  renderContent = () => {
    const { classes, firstName, lastName, loading } = this.props;
    const { isStatusShown } = this.state;
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
      showNewStakeholder,
      deleteStakeholder,
      firstName,
      lastName
    } = this.props;

    const { step, isFinalScreenShown, confirmation } = this.state;
    const fullName = `${firstName} ${lastName}`;

    if (isFinalScreenShown) {
      return <SuccessFilledStakeholder name={fullName} hideForm={this.finishStakeholderCreation} />;
    }

    return (
      <CompanyStakeholderCard
        content={this.state.isStatusShown && this.renderContent()}
        firstName={this.state.isStatusShown ? firstName : "New Stakeholder"}
        lastName={this.state.isStatusShown ? lastName : ""}
      >
        <div className={classes.formContent}>
          {stakeHoldersSteps.map(item => {
            const setStep = () => this.setStep(item);
            const isFilled = showNewStakeholder ? this.state.completedStep >= item.step : true;

            const handleContinue = () => {
              switch (item.title) {
                case "Personal Information":
                  return this.props.formatPersonalInformation(this.props.index);
                case "Nationality":
                  return this.props.formatNationality(this.props.index);
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

        {!showNewStakeholder && !!deleteStakeholder && (
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

const mapStateToProps = state => ({
  ...getSendProspectToAPIInfo(state)
});

const mapDispatchToProps = {
  sendProspectToAPI,
  formatPersonalInformation,
  formatNationality
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StakeholderStepper)
);
