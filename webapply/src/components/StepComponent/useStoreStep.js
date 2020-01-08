import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCompanySteps, setSignatorySteps } from "../../store/actions/completedSteps";

export const useStoreStep = (initialStep, page, fieldName, index = null) => {
  const [step, setStep] = useState(initialStep);
  const dispatch = useDispatch();
  const completedSteps = useSelector(state => state.completedSteps);

  let availableSteps;

  if (index !== null) {
    availableSteps = completedSteps[page][fieldName][index] || [];
  } else {
    availableSteps = completedSteps[page][fieldName] || [];
  }

  const handleSetNextStep = () => {
    const nextStep = step + 1;

    setStep(nextStep);
    if (!availableSteps.includes(step)) {
      if (index === null) {
        dispatch(setCompanySteps([...availableSteps, step]));
      } else {
        dispatch(setSignatorySteps(index, [...availableSteps, step]));
      }
    }
  };

  const handleSetStep = nextStep => {
    if (availableSteps.includes(nextStep)) {
      setStep(nextStep);
    }
  };

  return [step, handleSetStep, availableSteps, handleSetNextStep];
};
