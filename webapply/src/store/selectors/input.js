import get from "lodash/get";
import combineNestingName from "../../utils/combineNestingName";
import { getUiConfig } from "./appConfig";
import { getInputServerValidityByPath } from "./serverValidation";

export const getFieldConfigById = (state, id) => {
  return getUiConfig(state)[id] || {};
};

export const getDynamicInputName = (config, indexes) => {
  return config.name && config.name.includes("*")
    ? combineNestingName(config.name, indexes)
    : config.name;
};

export const getGeneralInputProps = (state, id, indexes) => {
  const config = getFieldConfigById(state, id);
  const name = getDynamicInputName(config, indexes);
  const value = get(state.appConfig, name);
  const serverValidation = getInputServerValidityByPath(state, name);
  return {
    config,
    name,
    value,
    serverValidation
  };
};
