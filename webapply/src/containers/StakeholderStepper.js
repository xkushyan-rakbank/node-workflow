import React from "react";
import { withStyles } from "@material-ui/core";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import { stakeHoldersSteps } from "../constants";
import SuccessFilledStakeholder from "../components/StakeholderStepForms/SuccessFilledStakeholder";
import StatusLoader from "../components/StatusLoader";
import LinkButton from "../components/Buttons/LinkButton";

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
  }
};

class StakeholderStepper extends React.Component {
  state = {
    isFinalScreenShown: false,
    step: 1,
    confirmation: false
  };

  handleContinue = () => {
    if (this.state.step < stakeHoldersSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true });
    }
  };

  finishStakeholderCreation = () => {
    this.props.hideForm();
    this.setState({ isFinalScreenShown: false });
  };

  deleteHandler = () => {
    if (this.state.confirmation) {
      this.setState({ confirmation: true });
      this.props.deleteStakeholder();
    } else {
      this.setState({ confirmation: true });
    }
  };

  render() {
    const { classes, index } = this.props;
    const { step, isFinalScreenShown, confirmation } = this.state;

    if (isFinalScreenShown) {
      return (
        <SuccessFilledStakeholder name="Chema Pastrana" hideForm={this.finishStakeholderCreation} />
      );
    }

    return (
      <CompanyStakeholderCard
        content={
          <>
            <div className={classes.title}>New Stakeholder</div>
            <StatusLoader />
          </>
        }
      >
        <div className={classes.formContent}>
          {stakeHoldersSteps.map(item => {
            const setStep = () => this.setState({ step: item.step });
            return (
              <StepComponent
                index={index}
                key={item.step}
                steps={stakeHoldersSteps}
                step={item.step}
                title={item.title}
                subTitle={item.infoTitle}
                active={step === item.step}
                filled={step > item.step}
                clickHandler={setStep}
                handleContinue={this.handleContinue}
              />
            );
          })}
        </div>

        {!!this.props.deleteStakeholder && (
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

export default withStyles(styles)(StakeholderStepper);
