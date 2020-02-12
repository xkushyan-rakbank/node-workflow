import React, { useState, useCallback } from "react";

import { STEP_3, servicesSteps, SELECT_SERVICES_PAGE_ID } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountNames } from "../../constants";
import { useReduxStep } from "../../hooks/useReduxStep";

import { useStyles } from "./styled";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

export const SelectServicesComponent = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const pushHistory = useTrackingHistory();

  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useReduxStep(
    SELECT_SERVICES_PAGE_ID,
    servicesSteps
  );

  const handleClickNextStep = useCallback(() => {
    if (isSubmit) {
      pushHistory(routes.SubmitApplication);
      return;
    }

    handleSetNextStep(activeStep);
    setIsSubmit(true);
  }, [pushHistory, isSubmit, setIsSubmit, handleSetNextStep]);

  const setNextStep = useCallback(
    event => {
      sendProspectToAPI(null, event).then(() => handleSetNextStep(activeStep), () => {});
    },
    [sendProspectToAPI, activeStep, pushHistory]
  );

  const createSetStepHandler = nextStep => () => {
    setIsSubmit(false);
    handleSetStep(nextStep);
  };

  return (
    <>
      <FormTitle
        title="Services for your account"
        info="Enough of us asking. Now it’s your turn to say which services you want, whether it is currencies, bossiness debit cards or cheque books."
      />

      <ServicesSteps
        activeStep={activeStep}
        completedSteps={availableSteps}
        isSubmit={isSubmit}
        clickHandler={createSetStepHandler}
        handleContinue={setNextStep}
      />

      <div className={classes.linkContainer}>
        <BackLink path={routes.uploadDocuments} />
        <SubmitButton
          className={classes.submitButton}
          handleClick={handleClickNextStep}
          label={isSubmit ? "Go to submit" : "Next Step"}
          justify="flex-end"
          disabled={
            availableSteps.some(step => step.step < STEP_3 && !step.isCompleted) ||
            (accountType === accountNames.starter && !rakValuePackage)
          }
        />
      </div>
    </>
  );
};
