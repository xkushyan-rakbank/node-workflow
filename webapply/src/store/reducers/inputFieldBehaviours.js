import { decisionDrivenFields } from "../../config/decisionsConfig.json";
import { handleActions } from "../../utils/redux-utils";
import {
  SHOW_INPUT_FIELD,
  HIDE_INPUT_FIELD,
  ENABLE_INPUT_FIELD,
  DISABLE_INPUT_FIELD
} from "../actions/decisions";

export const initialState = (() => {
  return Object.keys(decisionDrivenFields).reduce((inputStates, inputPath) => {
    inputStates[inputPath] = {
      // visible unless explicitely mentioned as false
      visible: decisionDrivenFields[inputPath].showByDefault !== false,
      // enabled unless explicitely mentioned as false
      enabled: decisionDrivenFields[inputPath].enableByDefault !== false
    };
    return inputStates;
  }, {});
})();

const setFieldVisibility = (state, payload, visible) => ({
  ...state,
  [payload]: {
    ...state[payload],
    visible
  }
});

const setFieldEnabled = (state, payload, enabled) => ({
  ...state,
  [payload]: {
    ...state[payload],
    enabled
  }
});

export default handleActions(
  {
    [SHOW_INPUT_FIELD]: (state, { payload }) => setFieldVisibility(state, payload, true),
    [HIDE_INPUT_FIELD]: (state, { payload }) => setFieldVisibility(state, payload, false),
    [ENABLE_INPUT_FIELD]: (state, { payload }) => setFieldEnabled(state, payload, true),
    [DISABLE_INPUT_FIELD]: (state, { payload }) => setFieldEnabled(state, payload, false)
  },
  initialState
);
