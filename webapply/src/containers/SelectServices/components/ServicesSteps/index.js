import React from "react";
import omit from "lodash/omit";
import cx from "classnames";

import { servicesSteps } from "../../../../constants/index";
import { GO_TO_SUBMIT_STEP } from "../../constants";

import ServicesStepTitle from "../../../../components/ServicesStepTitle";

import { styles } from "./styled";

export const ServicesSteps = ({ step, setStep, handleContinue }) => {
  const classes = styles();

  return servicesSteps.map(serviceStep => {
    const Component = serviceStep.component;
    const stepData = omit(serviceStep, "component");

    return (
      <div key={serviceStep.title}>
        <div className={classes.stepWrapper}>
          <ServicesStepTitle step={stepData} activeStep={step} setStep={setStep} />
          {step === serviceStep.step && (
            <div
              className={cx(classes.formWrapper, {
                [classes.valueAddedServices]: step === GO_TO_SUBMIT_STEP
              })}
            >
              <Component goToNext={handleContinue} activeStep={step} />
            </div>
          )}
        </div>
      </div>
    );
  });
};
