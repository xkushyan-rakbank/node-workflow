import get from "lodash/get";

export const getUiConfig = state => state.appConfig.uiConfig || {};

export const getInputValueById = (state, id) => {
  const config = getUiConfig(state)[id] || {};
  return get(state.appConfig, config.name);
};
