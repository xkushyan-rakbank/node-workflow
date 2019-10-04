import * as actions from "../actions/serverValidation";

const initialState = {
  inputs: {}
};

const serverErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_INPUTS_ERRORS:
      return {
        ...state,
        inputs: action.payload.reduce((acc, item) => {
          acc[composeInputKeyFromValidationData(item)] = item;
          return acc;
        }, {})
      };
    case actions.PATCH_INPUTS_ERRORS:
      return {
        ...state,
        inputs: action.payload.reduce(
          (acc, item) => {
            acc[composeInputKeyFromValidationData(item)] = item;
            return acc;
          },
          { ...state.inputs }
        )
      };
    case actions.RESET_INPUTS_ERRORS:
      return {
        ...state,
        inputs: {}
      };
    default:
      return state;
  }
};

export function composeInputKeyFromValidationData(validationData) {
  const replaced = validationData.fieldPath.replace("$.", "").replace("$", "");

  return replaced.startsWith("prospect.") ? replaced : `prospect.${replaced}`;
}

export default serverErrorsReducer;
