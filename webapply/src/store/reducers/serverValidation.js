import { SET_INPUTS_ERRORS, RESET_INPUTS_ERRORS } from "../actions/serverValidation";
import routes from "./../../routes";
import { handleActions } from "../../utils/redux-utils";
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
