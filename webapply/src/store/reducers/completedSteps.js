import { handleActions } from "../../utils/redux-utils";
import { SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { LOAD_META_DATA } from "../actions/appConfig";
import { log } from "../../utils/loggger";

export const initialState = [];

const completedSteps = handleActions(
  {
    [LOAD_META_DATA]: (state, { payload: json }) => {
      if (!json) {
        return state;
      }

      try {
        const { completedSteps } = JSON.parse(json);

        return completedSteps;
      } catch (err) {
        log(err);
      }

      return state;
    },
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
