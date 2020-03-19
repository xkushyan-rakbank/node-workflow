import * as actions from "../actions/serverValidation";
import routes from "./../../routes";

export const replaceDollarsAndDot = (str = "") => str.replace(/\$+ |\.$/g, "");

export const initialState = {
  inputs: {}
};

const serverErrorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_INPUTS_ERRORS:
      return {
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
  const pathname = window.location.pathname;
  const replaced = validationData.fieldPath.replace("$.", "").replace("$", "");

  if (replaced.startsWith("prospect.")) {
    return replaced;
  } else if (pathname.includes(routes.login)) {
    return `login.${replaced}`;
  } else if (pathname.includes(routes.searchProspect)) {
    return `searchInfo.${replaced}`;
  } else {
    return `prospect.${replaced}`;
  }
}

export default serverErrorsReducer;
