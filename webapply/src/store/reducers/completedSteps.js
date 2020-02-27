import get from "lodash/get";

import { handleActions } from "../../utils/redux-utils";
import { SET_STEP_STATUS, SET_INITIAL_STEPS, REMOVE_SIGNATORY } from "../actions/completedSteps";
import { GET_PROSPECT_INFO_SUCCESS } from "../actions/retrieveApplicantInfo";
import { log } from "../../utils/loggger";

export const initialState = [];

const completedSteps = handleActions(
  {
    [GET_PROSPECT_INFO_SUCCESS]: (state, { payload: { prospect } }) => {
      const json = get(prospect, "freeFieldsInfo.freeField5");
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
