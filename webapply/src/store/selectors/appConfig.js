import get from "lodash/get";
import combineNestingName from "../../utils/combineNestingName";

export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getInputValueById = (state, id, indexes = []) => {
  const config = getUiConfig(state)[id] || {};
  const name =
    config.name && config.name.includes("*")
      ? combineNestingName(config.name, indexes)
      : config.name;

  return get(state.appConfig, name);
};
