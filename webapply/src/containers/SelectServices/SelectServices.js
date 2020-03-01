import React, { useState, useCallback } from "react";

import { STEP_3, servicesSteps, SELECT_SERVICES_PAGE_ID } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountNames, CONTINUE, NEXT, STEP_STATUS } from "../../constants";
import { useStep } from "../../hooks/useStep";

import { useStyles } from "./styled";
import { useTrackingHistory } from "../../utils/useTrackingHistory";

export const SelectServicesComponent = ({ accountType, rakValuePackage, sendProspectToAPI }) => {
  const classes = useStyles();
  const [isSubmit, setIsSubmit] = useState(false);
  const pushHistory = useTrackingHistory();

  const [activeStep, availableSteps, handleSetStep, handleSetNextStep] = useStep(
    SELECT_SERVICES_PAGE_ID,
    servicesSteps
  );
  const isAllStepsCompleted = !availableSteps.some(
    step => step.step < STEP_3 && step.status !== STEP_STATUS.COMPLETED
  );
  const handleClickNextStep = useCallback(() => {
    if (isSubmit) {
      sendProspectToAPI(NEXT).then(isScreeningError => {
        if (!isScreeningError) pushHistory(routes.SubmitApplication);
      });
      return;
    }

    handleSetNextStep(activeStep);
    setIsSubmit(true);
  }, [pushHistory, isSubmit, setIsSubmit, handleSetNextStep, activeStep, sendProspectToAPI]);

  const setNextStep = useCallback(
    event => {
      sendProspectToAPI(CONTINUE, event).then(() => handleSetNextStep(activeStep), () => {});
    },
    [sendProspectToAPI, activeStep, handleSetNextStep]
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
            !isAllStepsCompleted || (accountType === accountNames.starter && !rakValuePackage)
          }
        />
      </div>
    </>
  );
};
