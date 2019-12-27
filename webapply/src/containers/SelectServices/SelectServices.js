import React, { useState, useCallback } from "react";

import { GO_TO_SUBMIT_STEP, SUBMIT_APPLICATION_STEP, STEP_1, STEP_3 } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import SubmitApplication from "./components/SubmitApplication";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountsNames } from "../../constants";

import { useStyles } from "./styled";

export const SelectServicesComponent = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const classes = useStyles();
  const [step, setStep] = useState(STEP_1);

  const setNextStep = useCallback(() => {
    sendProspectToAPI().then(() => setStep(step + 1), () => {});
  }, [sendProspectToAPI, step]);

  const createSetStepHandler = nextStep => () => {
    if (step > nextStep) {
      setStep(nextStep);
    }
  };

  if (step === SUBMIT_APPLICATION_STEP) {
    return <SubmitApplication />;
  }

  return (
    <>
      <FormTitle
        title="Services for your account"
        info="Enough of us asking. Now it’s your turn to say which services you want, whether it is
        foreign currencies, cards or chequebooks."
      />

      <ServicesSteps step={step} clickHandler={createSetStepHandler} handleContinue={setNextStep} />

      <div className={classes.linkContainer}>
        <BackLink path={routes.uploadDocuments} />
        <SubmitButton
          className={classes.submitButton}
          handleClick={setNextStep}
          label={step === GO_TO_SUBMIT_STEP ? "Go to submit" : "Next Step"}
          justify="flex-end"
          disabled={step <= STEP_3 || (accountType === accountsNames.starter && !rakValuePackage)}
        />
      </div>
    </>
  );
};
