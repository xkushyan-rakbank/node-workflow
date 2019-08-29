import React from "react";
import { withStyles } from "@material-ui/core";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import { stakeHoldersSteps } from "../constants";
import SuccessFilledStakeholder from "../components/StepForms/SuccessFilledStakeholder";

const styles = {
  title: {
    marginLeft: "24px",
    fontSize: "20px",
    fontWeight: 600,
    color: "#373737"
  },
  formContent: {
    borderTop: "1px solid rgba(230, 230, 230, 0.5)"
  }
};

class StakeholderStepper extends React.Component {
  state = {
    isFinalScreenShown: false,
    step: 1
  };

  handleContinue = () => {
    if (this.state.step < stakeHoldersSteps.length) {
      this.setState(state => ({ step: state.step + 1 }));
    } else {
      this.setState({ isFinalScreenShown: true });
    }
  };

  render() {
    const { classes } = this.props;
    const { step, isFinalScreenShown } = this.state;

    if (isFinalScreenShown) {
      return <SuccessFilledStakeholder name="Chema Pastrana" />;
    }

    return (
      <CompanyStakeholderCard
        content={<div className={classes.title}>New Stakeholder</div>}
      >
        <div className={classes.formContent}>
          {stakeHoldersSteps.map(item => {
            const setStep = () => this.setState({ step: item.step });
            return (
              <StepComponent
                key={item.step}
                step={item.step}
                title={item.title}
                active={step === item.step}
                filled={step > item.step}
                clickHandler={setStep}
                handleContinue={this.handleContinue}
              />
            );
          })}
        </div>
      </CompanyStakeholderCard>
    );
  }
}

export default withStyles(styles)(StakeholderStepper);
