import { useDispatch, useSelector } from "react-redux";
import React, { useState, useCallback } from "react";
import { getIn } from "formik";
import isEqual from "lodash/isEqual";

import { FormikEffect } from "../components/Form/FormikEffect";
import { setStepStatus, setInitialSteps } from "../store/actions/completedSteps";
import { getCompletedSteps } from "../store/selectors/completedSteps";
import { STEP_STATUS } from "../constants";

export const useStep = (flowId, steps) => {
  const [activeStep, setActiveStep] = useState(steps[0].step);
  const dispatch = useDispatch();
  const availableSteps = useSelector(getCompletedSteps).filter(item => item.flowId === flowId);

  if (!availableSteps.length) {
    dispatch(
      setInitialSteps(
        steps.map(step => ({
          flowId,
          step: step.step,
          status: STEP_STATUS.NOT_AVAILABLE
        }))
      )
    );
    setActiveStep(steps[0].step);
  }

  const handleSetNextStep = step => {
    const nextStep = step < steps.length ? step + 1 : null;

    setActiveStep(nextStep);
    dispatch(setStepStatus(flowId, step, STEP_STATUS.COMPLETED));
  };

  const handleSetStep = nextStep => {
    if (
      availableSteps.some(
        step =>
          step.step === nextStep &&
          (step.status === STEP_STATUS.COMPLETED || step.status === STEP_STATUS.AVAILABLE)
      )
    ) {
      setActiveStep(nextStep);
    }
  };

  const handleFormChange = useCallback(
    (prevValues, props) => {
      const isValuesChanged = Object.keys(props.values).some(
        key =>
          getIn(props.touched, key) &&
          !isEqual(getIn(props.values, key), getIn(prevValues.current, key))
      );

      if (isValuesChanged) {
        const { status } = availableSteps.find(item => item.step === activeStep) || {};

        if (status === STEP_STATUS.COMPLETED) {
          dispatch(setStepStatus(flowId, activeStep, STEP_STATUS.AVAILABLE));
        }
      }
    },
    [dispatch, availableSteps, activeStep, flowId]
  );

  // eslint-disable-next-line react/display-name
  const createFormChangeHandler = cb => props => {
    return (
      <>
        <FormikEffect onChange={handleFormChange} />
        {cb(props)}
      </>
    );
  };

  return [activeStep, availableSteps, handleSetStep, handleSetNextStep, createFormChangeHandler];
};
