import get from "lodash/get";
import combineNestingName from "../../utils/combineNestingName";

export const getUiConfig = state => state.appConfig.uiConfig || {};
export const geProspect = state => state.appConfig.prospect || {};

export const getFieldConfigById = (state, id) => {
  return getUiConfig(state)[id] || {};
};

export const getInputNameById = (state, id, indexes = []) => {
  const config = getFieldConfigById(state, id);
  return config.name && config.name.includes("*")
    ? combineNestingName(config.name, indexes)
    : config.name;
};

export const getInputValueById = (state, id, indexes = []) => {
  return get(state.appConfig, getInputNameById(state, id, indexes));
};

export const getSignatories = state => geProspect(state).signatoryInfo;
