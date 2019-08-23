import React, { useState } from "react";
import { withStyles } from "@material-ui/core";
import CompanyStakeholderCard from "../components/CompanyStakeholderCard";
import StepComponent from "../components/StepComponent";
import { stakeHoldersSteps } from "../constants";

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

const StakeholderStepper = props => {
  const { classes } = props;
  const [step, setStep] = useState(1);
  const handleContinue = () => {
    if (step < stakeHoldersSteps.length) {
      setStep(step + 1);
    }
  };

  return (
    <CompanyStakeholderCard
      content={<div className={classes.title}>New Stakeholder</div>}
    >
      <div className={classes.formContent}>
        {stakeHoldersSteps.map(item => (
          <StepComponent
            key={item.step}
            step={item.step}
            title={item.title}
            active={step === item.step}
            filled={step > item.step}
            clickHandler={() => setStep(item.step)}
            handleContinue={handleContinue}
          />
        ))}
      </div>
    </CompanyStakeholderCard>
  );
};

export default withStyles(styles)(StakeholderStepper);
