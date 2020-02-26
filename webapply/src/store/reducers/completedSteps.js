import { handleActions } from "../../utils/redux-utils";
import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  RESTORE_STEPS
} from "../actions/completedSteps";

export const initialState = [];

const completedSteps = handleActions(
  {
    [RESTORE_STEPS]: (state, { payload: { steps } }) => steps,
    [SET_STEP_STATUS]: (state, { payload }) =>
      state.map(item =>
        item.flowId === payload.flowId && item.step === payload.step
          ? { ...item, status: payload.status }
          : item
      ),
    [SET_INITIAL_STEPS]: (state, { payload: { steps } }) => [...state, ...steps],
    [REMOVE_SIGNATORY]: (state, { payload: signatoryId }) =>
      state.filter(step => !step.flowId.includes(signatoryId))
  },
  initialState
);

export default completedSteps;
