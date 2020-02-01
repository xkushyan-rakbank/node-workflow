import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCompletedSteps } from "../../store/actions/completedSteps";

export const useReduxStep = (initialStep, page, path, index = null) => {
  const [step, setStep] = useState(initialStep);
  const dispatch = useDispatch();

  const pageCompletedSteps = useSelector(state => state.completedSteps[page] || {});

  let completedSteps;

  if (index !== null) {
    completedSteps = pageCompletedSteps[path][index] || [];
  } else {
    completedSteps = pageCompletedSteps[path] || [];
  }

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);

    if (!completedSteps.includes(step)) {
      let steps;

      if (index !== null) {
        steps = {
          ...pageCompletedSteps,
          [path]: pageCompletedSteps[path].map((item, idx) => {
            if (index === idx) {
              return [...item, step];
            }
            return item;
          })
        };
      } else {
        steps = {
          ...pageCompletedSteps,
          [path]: [...pageCompletedSteps[path], step]
        };
      }

      dispatch(setCompletedSteps(page, steps));
    }
  };

  const handleSetStep = nextStep => {
    if (completedSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return [step, handleSetStep, completedSteps, handleSetNextStep];
};
