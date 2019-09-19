import * as actions from "../actions/serverValidation";

/**
 * @typedef {Object} ServerValidationInputData
 * @property {String} fieldPath
 * @property {String} errorCode
 * @property {String} errorType
 * @property {String} message
 * @property {String} developerText
 *
 * @typedef {Object} ServerValidation
 * @property {{[String]: ServerValidationInputData}} inputs
 * @type {ServerValidation}
 */
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
          (acc, item) => (acc[composeInputKeyFromValidationData(item)] = item),
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

/**
 * @param {ServerValidationInputData} validationData
 * @return {String}
 */
export function composeInputKeyFromValidationData(validationData) {
  const replaced = validationData.fieldPath.replace("$.", "").replace("$", "");

  return `prospect.${replaced}`;
}

export default serverErrorsReducer;
