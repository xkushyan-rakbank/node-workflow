import React, { useState, useCallback } from "react";

import { STEP_3, STEP_1, STEP_4, SELECT_SERVICES_PAGE_ID } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountNames } from "../../constants";
import { useReduxStep } from "../../components/StepComponent/useReduxStep";

import { useStyles } from "./styled";

export const SelectServicesComponent = ({
  accountType,
  rakValuePackage,
  sendProspectToAPI,
  history
}) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const classes = useStyles();

  const [step, handleSetStep, completedSteps, handleSetNextStep] = useReduxStep(
    STEP_1,
    SELECT_SERVICES_PAGE_ID
  );

  const handleClickNextStep = useCallback(() => {
    if (isSubmit) {
      history.push(routes.SubmitApplication);
      return;
    }
    if (completedSteps.length < STEP_4) {
      handleSetNextStep();
    }
    setIsSubmit(true);
  }, [history, isSubmit, setIsSubmit, handleSetNextStep]);

  const setNextStep = useCallback(() => {
    sendProspectToAPI().then(() => handleSetNextStep(), () => {});
  }, [sendProspectToAPI, handleSetNextStep]);

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
        activeStep={step}
        completedSteps={completedSteps}
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
            completedSteps.length < STEP_3 ||
            (accountType === accountNames.starter && !rakValuePackage)
          }
        />
      </div>
    </>
  );
};
