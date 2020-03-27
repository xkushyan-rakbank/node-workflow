import { SET_INPUTS_ERRORS, RESET_INPUTS_ERRORS } from "../actions/serverValidation";
import { handleActions } from "../../utils/redux-utils";
import { composeInputKeyFromValidationData } from "../../utils/composeInputKeyFromValidationData";
/* istanbul ignore next */
export const replaceDollarsAndDot = (str = "") => str.replace(/\$+ |\.$/g, "");

export const initialState = {
  inputs: {}
};

export default handleActions(
  {
    [SET_INPUTS_ERRORS]: (state, action) => ({
      ...state,
      inputs: action.payload.reduce(
        (acc, item) => ({
          ...acc,
          [composeInputKeyFromValidationData(item)]: {
            ...item,
            message: replaceDollarsAndDot(item.message)
          }
        }),
        {}
      )
    }),
    [RESET_INPUTS_ERRORS]: state => ({
      ...state,
      inputs: {}
    })
  },
  initialState
);
