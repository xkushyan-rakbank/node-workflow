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
  inputs: {
    "prospect.applicantInfo.fullName": {
      fieldPath: "$.prospect.applicantInfo.fullName",
      errorCode: "Validation",
      errorType: "InputError",
      message: "Server validation message",
      developerText: ""
    }
  }
};

const serverErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_INPUTS_ERRORS:
      return {
        ...state,
        inputs: action.payload.reduce(
          (acc, item) => (acc[composeInputKeyFromValidationData(item)] = item),
          {}
        )
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
  return validationData.fieldPath.replace("$.", "").replace("$", "");
}

export default serverErrorsReducer;
