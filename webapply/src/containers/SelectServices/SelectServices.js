import React, { useCallback } from "react";

import { GO_TO_SUBMIT_STEP, STEP_1 } from "./constants";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { ServicesSteps } from "./components/ServicesSteps/index";
import { BackLink } from "../../components/Buttons/BackLink";
import { FormTitle } from "./components/FormTitle";
import routes from "../../routes";
import { accountNames } from "../../constants";
import { useReduxStep } from "../../components/StepComponent/useReduxStep";
import { SELECT_SERVICES_PAGE, SELECT_SERVICES_PATH, servicesSteps } from "./constants";

import { useStyles } from "./styled";

export const SelectServicesComponent = ({
  accountType,
  rakValuePackage,
  sendProspectToAPI,
  history
}) => {
  const classes = useStyles();

  const [step, handleSetStep, completedSteps, handleSetNextStep] = useReduxStep(
    STEP_1,
    SELECT_SERVICES_PAGE,
    SELECT_SERVICES_PATH
  );

  const handleClickNextStep = useCallback(() => history.push(routes.SubmitApplication), [history]);

  const setNextStep = useCallback(() => {
    sendProspectToAPI().then(() => handleSetNextStep(), () => {});
  }, [sendProspectToAPI, handleSetNextStep]);

  const createSetStepHandler = nextStep => () => handleSetStep(nextStep);

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
          handleClick={handleClickNextStep}
          label={step === GO_TO_SUBMIT_STEP ? "Go to submit" : "Next Step"}
          justify="flex-end"
          disabled={
            completedSteps.length !== servicesSteps.length ||
            (accountType === accountNames.starter && !rakValuePackage)
          }
        />
      </div>
    </>
  );
};
