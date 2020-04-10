import React from "react";
import cx from "classnames";

import { NextStepButton } from "../../../components/Buttons/NextStepButton";
import { ServicesSteps } from "./ServicesSteps/index";
import { BackLink } from "../../../components/Buttons/BackLink";
import { FormTitle } from "./FormTitle";
import routes from "../../../routes";

import { useStyles } from "./styled";

export const SelectServices = ({
  activeStep,
  availableSteps,
  isSubmit,
  isNextButtonDisabled,
  handleContinue,
  handleClickNextStep,
  createFormChangeHandler,
  createSetStepHandler
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
        isSubmit={isSubmit}
        clickHandler={createSetStepHandler}
        handleContinue={handleContinue}
        createFormChangeHandler={createFormChangeHandler}
      />

      <div className={classes.linkContainer}>
        <BackLink path={routes.uploadDocuments} />
        <NextStepButton
          handleClick={() => handleClickNextStep(isSubmit)}
          label={isSubmit ? "Go to submit" : "Next Step"}
          className={cx({ [classes.submitButton]: isSubmit })}
          justify="flex-end"
          disabled={isNextButtonDisabled}
        />
      </div>
    </>
  );
};
