import { STEP_STATUS } from "../constants";

export const checkAllStepsCompleted = (steps = []) =>
  !!steps.length && !steps.some(step => step.status !== STEP_STATUS.COMPLETED);
