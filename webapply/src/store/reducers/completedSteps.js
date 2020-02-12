import { SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY } from "../actions/completedSteps";

export const initialState = [];

const completedSteps = (state = initialState, action) => {
  switch (action.type) {
    case SET_STEP_STATUS:
      return state.map(step => {
        if (step.flowId === action.payload.flowId) {
          if (step.step === action.payload.step) {
            return { ...step, ...action.payload.status };
          }
          return step.isActive ? { ...step, isActive: false } : step;
        }
        return step;
      });
    case SET_INITIAL_STEPS:
      return [...state, ...action.payload.steps];
    case REMOVE_SIGNATORY:
      return state.filter(flow => !flow.flowId.includes(action.signatoryId));
    default:
      return state;
  }
};

export default completedSteps;
