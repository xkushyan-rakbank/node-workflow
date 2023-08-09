import React from "react";
import cx from "classnames";

import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { ServicesSteps } from "./ServicesSteps";
import { BackLink } from "../../../components/Buttons/BackLink";
import { FormTitle } from "./FormTitle";
import routes from "../../../routes";

import { useStyles } from "./styled";
import { Footer } from "../../../components/Footer";

export const SelectServices = ({
  activeStep,
  availableSteps,
  isSubmitOnClickNextStepButton,
  isNextButtonDisabled,
  handleContinue,
  handleClickNextStep,
  createFormChangeHandler,
  createSetStepHandler,
  isComeFromROScreensCheck,
  singleSignatory
}) => {
  const classes = useStyles();
  return (
    <>
      <FormTitle
        title="Services for your account"
        info="Enough of us asking. Now it’s your turn to say which services you want, whether it is currencies, bussiness debit cards or cheque books."
      />

      <ServicesSteps
        activeStep={activeStep}
        completedSteps={availableSteps}
        clickHandler={createSetStepHandler}
        handleContinue={handleContinue}
        isComeFromROScreensCheck={isComeFromROScreensCheck}
        createFormChangeHandler={createFormChangeHandler}
        singleSignatory={singleSignatory}
      />

      <Footer>
        <BackLink path={routes.uploadDocuments} />
        <NextStepButton
          handleClick={handleClickNextStep}
          label={isSubmitOnClickNextStepButton ? "Go to submit" : "Next Step"}
          className={cx({ [classes.submitButton]: isSubmitOnClickNextStepButton })}
          justify="flex-end"
          disabled={isNextButtonDisabled}
        />
      </Footer>
    </>
  );
};
