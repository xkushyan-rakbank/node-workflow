import React, { useState, useEffect } from "react";

import { BackLink } from "../../components/Buttons/BackLink";
import { SubmitButton } from "../../components/Buttons/SubmitButton";
import { SubmitApplication } from "./components/SubmitApplication";
import { ServicesSteps } from "./components/ServicesSteps/index";

import routes from "../../routes";
import { getSelectedTypeCurrency } from "../../utils/SelectServices";
import { accountsNames } from "../../constants/index";
import { GO_TO_SUBMIT_STEP, SUBMIT_APPLICATION_STEP, servicesSteps } from "./constants";

import { useStyles } from "./styled";

export const SelectServicesComponent = props => {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [canSubmit, setCanSubmit] = useState(false);
  const { accountType, rakValuePackage, accountCurrencies } = props;

  const setNextStep = () => setStep(step + 1);
  const handleContinue = () => {
    if (step < servicesSteps.length) {
      setNextStep();
      return;
    }
    setCanSubmit(true);
  };

  useEffect(() => {
    const { isSelectOnlyForeignCurrency } = getSelectedTypeCurrency(accountCurrencies);
    if (step === servicesSteps.length) {
      if (accountType === accountsNames.starter) {
        if (rakValuePackage || isSelectOnlyForeignCurrency) {
          setCanSubmit(true);
        }
        return;
      }
      setCanSubmit(true);
    }
  }, [step, accountType, rakValuePackage, accountCurrencies]);

  return step === SUBMIT_APPLICATION_STEP ? (
    <SubmitApplication />
  ) : (
    <>
      <h2>Services for your account</h2>
      <p className={classes.formDescription}>
        Enough of us asking. Now it’s your turn to say which services you want, whether it is
        foreign currencies, cards or chequebooks.
      </p>

      <ServicesSteps step={step} setStep={setStep} handleContinue={handleContinue} />

      <div className={classes.linkContainer}>
        <BackLink path={routes.uploadDocuments} />
        <SubmitButton
          handleClick={setNextStep}
          label={step === GO_TO_SUBMIT_STEP ? "Go to submit" : "Next Step"}
          justify="flex-end"
          disabled={!canSubmit}
        />
      </div>
    </>
  );
};
