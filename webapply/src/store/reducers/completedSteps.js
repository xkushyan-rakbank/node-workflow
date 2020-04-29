import { handleActions } from "../../utils/redux-utils";
import {
  SET_STEP_STATUS,
  SET_INITIAL_STEPS,
  REMOVE_SIGNATORY,
  SET_STEPS_STATUS
} from "../actions/completedSteps";
import { LOAD_META_DATA } from "../actions/appConfig";
import { log } from "../../utils/loggger";

export const initialState = [];

export const setStepsStatus = (state, steps, status) =>
  state.map(item =>
    steps.some(step => item.flowId === step.flowId && item.step === step.step)
      ? { ...item, status }
      : item
  );

const completedSteps = handleActions(
  {
    [LOAD_META_DATA]: (state, { payload: json }) => {
      if (json) {
        try {
          const { completedSteps } = JSON.parse(json);

          return completedSteps;
        } catch (err) {
          log(err);
        }
      }

      return state;
    },
    [SET_STEP_STATUS]: (state, { payload: { flowId, step, status } }) =>
      setStepsStatus(state, [{ flowId, step }], status),
    [SET_STEPS_STATUS]: (state, { payload: { steps, status } }) =>
      setStepsStatus(state, steps, status),
    [SET_INITIAL_STEPS]: (state, { payload: { steps } }) => [...state, ...steps],
    [REMOVE_SIGNATORY]: (state, { payload: { signatoryId } }) =>
      state.filter(step => !step.flowId.includes(signatoryId))
  },
  initialState
);

export default completedSteps;
