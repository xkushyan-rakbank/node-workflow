import { formStepper, searchProspectStepper } from "../../../constants";

export const setNavigationStep = (isAgentBaseName, isFormStepper) => {
  let navigationSteps;
  if (isAgentBaseName) {
    navigationSteps = searchProspectStepper;
  } else if (isFormStepper) {
    navigationSteps = formStepper;
  } else {
    navigationSteps = [];
  }
  return navigationSteps;
};
