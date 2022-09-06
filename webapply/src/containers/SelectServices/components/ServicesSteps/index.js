import React from "react";
import cx from "classnames";

import { servicesSteps } from "../../constants";
import { STEP_STATUS } from "../../../../constants";
import { ServicesStepTitle } from "./ServicesStepTitle";

import { useStyles } from "./styled";

export const ServicesSteps = ({
  activeStep,
  clickHandler,
  handleContinue,
  createFormChangeHandler,
  isComeFromROScreensCheck,
  isSubmit,
  completedSteps,
  isSignatory
}) => {
  const classes = useStyles();

  return servicesSteps[isComeFromROScreensCheck].map(
    ({ component: Component, ...stepData }) =>
      Component && (
        <div key={stepData.step}>
          <div className={classes.stepWrapper}>
            <ServicesStepTitle
              step={stepData}
              isEditAvailable={
                (activeStep !== stepData.step || isSubmit) &&
                completedSteps.some(
                  step => step.step === stepData.step && step.status === STEP_STATUS.COMPLETED
                )
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
                  createFormChangeHandler={createFormChangeHandler}
                  activeStep={activeStep}
                  isSignatory={isSignatory}
                />
              </div>
            )}
          </div>
        </div>
      )
  );
};
