import React from "react";
import cx from "classnames";

import { servicesSteps } from "../../constants";

import { ServicesStepTitle } from "../ServicesStepTitle";

import { useStyles } from "./styled";

export const ServicesSteps = ({
  activeStep,
  clickHandler,
  handleContinue,
  isSubmit,
  completedSteps
}) => {
  const classes = useStyles();

  return servicesSteps.map(({ component: Component, ...stepData }) => (
    <div key={stepData.step}>
      <div className={classes.stepWrapper}>
        <ServicesStepTitle
          step={stepData}
          isEditAvailable={
            (activeStep !== stepData.step || isSubmit) &&
            completedSteps.some(step => step.id === stepData.step && step.isCompleted)
          }
          createClickHandler={clickHandler}
        />
        {!isSubmit && activeStep === stepData.step && (
          <div
            className={cx(classes.formWrapper, {
              [classes.valueAddedServices]: isSubmit
            })}
          >
            <Component
              goToNext={() => handleContinue(stepData.eventName)}
              activeStep={activeStep}
            />
          </div>
        )}
      </div>
    </div>
  ));
};
