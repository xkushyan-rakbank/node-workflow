import React, { createContext, useMemo, useState } from "react";

export const StepStateContext = createContext({});

export const StepState = ({ children }) => {
  const [state, setState] = useState({
    "/sme/FinalQuestions": {
      companySteps: [],
      signatorySteps: []
    }
  });
  const context = useMemo(
    () => ({
      ...state,
      setCompletedSteps: (path, fieldName, steps) =>
        setState({ ...state, [path]: { ...state[path], [fieldName]: steps } }),
      setCompletedStepsArray: (path, fieldName, stepIndex, steps) => {
        const newSteps = state[path][fieldName].map((item, index) => {
          if (index === stepIndex) {
            return steps;
          }
          return item;
        });
        setState({ ...state, [path]: { ...state[path], [fieldName]: newSteps } });
      }
    }),
    [state]
  );

  return <StepStateContext.Provider value={context}>{children}</StepStateContext.Provider>;
};
