import React from "react";
import cx from "classnames";

import { GO_TO_SUBMIT_STEP, servicesSteps } from "../../constants";

import { ServicesStepTitle } from "../ServicesStepTitle";

import { useStyles } from "./styled";

export const ServicesSteps = ({ step, clickHandler, handleContinue }) => {
  const classes = useStyles();

  return servicesSteps.map(({ component: Component, ...stepData }) => (
    <div key={stepData.step}>
      <div className={classes.stepWrapper}>
        <ServicesStepTitle
          step={stepData}
          isCompleteStep={step}
          createClickHandler={clickHandler}
        />
        {step === stepData.step && (
          <div
            className={cx(classes.formWrapper, {
              [classes.valueAddedServices]: step === GO_TO_SUBMIT_STEP
            })}
          >
            <Component goToNext={() => handleContinue(stepData.eventName)} activeStep={step} />
          </div>
        )}
      </div>
    </div>
  ));
};
