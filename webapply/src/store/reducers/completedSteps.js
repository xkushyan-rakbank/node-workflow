import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  INIT_ALL_STEPS_STATUS
} from "../actions/completedSteps";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case INIT_ALL_STEPS_STATUS:
      return action.payload.steps;
    case SET_STEP_STATUS:
      return state.map(step =>
        step.flowId === action.payload.flowId && step.step === action.payload.step
          ? { ...step, status: action.payload.status }
          : step
      );
    case SET_INITIAL_STEPS:
      return [...state, ...action.payload.steps];
    case REMOVE_SIGNATORY:
      return state.filter(step => !step.flowId.includes(action.signatoryId));
    default:
      return state;
  }
};

export default completedSteps;
