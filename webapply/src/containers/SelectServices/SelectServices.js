import React, { useState, useCallback } from "react";

import { GO_TO_SUBMIT_STEP, STEP_1, STEP_3 } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountNames } from "../../constants";

import { useStyles } from "./styled";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

export const SelectServicesComponent = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const classes = useStyles();
  const pushHistory = useTrackingHistory();
  const [step, setStep] = useState(STEP_1);

  const setNextStep = useCallback(
    event => {
      if (step === GO_TO_SUBMIT_STEP) {
        return pushHistory(routes.SubmitApplication);
      }
      sendProspectToAPI(null, event).then(() => setStep(step + 1), () => {});
    },
    [sendProspectToAPI, step, pushHistory]
  );

  const createSetStepHandler = nextStep => () => {
    if (step > nextStep) {
      setStep(nextStep);
    }
  };

  return (
    <>
      <FormTitle
        title="Services for your account"
        info="Enough of us asking. Now it’s your turn to say which services you want, whether it is currencies, bossiness debit cards or cheque books."
      />

      <ServicesSteps step={step} clickHandler={createSetStepHandler} handleContinue={setNextStep} />

      <div className={classes.linkContainer}>
        <BackLink path={routes.uploadDocuments} />
        <SubmitButton
          className={classes.submitButton}
          handleClick={setNextStep}
          label={step === GO_TO_SUBMIT_STEP ? "Go to submit" : "Next Step"}
          justify="flex-end"
          disabled={step <= STEP_3 || (accountType === accountNames.starter && !rakValuePackage)}
        />
      </div>
    </>
  );
};
