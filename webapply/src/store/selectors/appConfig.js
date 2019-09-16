import get from "lodash/get";
import combineNestingName from "../../utils/combineNestingName";

export const getUiConfig = state => state.appConfig.uiConfig || {};
/**
 * @param {Store} state
 * @return {Prospect}
 */
export const geProspect = state => state.appConfig.prospect || {};

export const getFieldConfigById = (state, id) => {
  return getUiConfig(state)[id] || {};
};

export const getDynamicInputName = (config, indexes) => {
  return config.name && config.name.includes("*")
    ? combineNestingName(config.name, indexes)
    : config.name;
};

export const getInputNameById = (state, id, indexes = []) => {
  return getDynamicInputName(getFieldConfigById(state, id), indexes);
};

export const getInputValueById = (state, id, indexes = []) => {
  return get(state.appConfig, getInputNameById(state, id, indexes));
};

export const getGeneralInputProps = (state, id, indexes) => {
  const config = getFieldConfigById(state, id);
  const name = getDynamicInputName(config, indexes);
  const value = get(state.appConfig, name);
  return {
    config,
    name,
    value
  };
};

/**
 * @param {Store} state
 * @return {Signatory[]|[]}
 */
export const getSignatories = state => geProspect(state).signatoryInfo || [];
/**
 * @param {Store} state
 * @return {OrgKYCDetails|{}}
 */
export const getOrgKYCDetails = state => geProspect(state).orgKYCDetails || {};
