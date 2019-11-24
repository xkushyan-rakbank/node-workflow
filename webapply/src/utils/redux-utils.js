export const ACTIONS_DELIMITER = ",";

export const composeActions = (...actions) => actions.join(ACTIONS_DELIMITER);
export const decomposeActions = actions => actions.split(ACTIONS_DELIMITER);

export const handleActions = (handlersMap, defaultState) => {
  const keysMap = Object.keys(handlersMap).reduce((accKeysMap, key) => {
    const keyActionsMap = key
      .split(ACTIONS_DELIMITER)
      .reduce((acckeyActionsMap, item) => ({ ...acckeyActionsMap, [item]: key }), {});

    return { ...accKeysMap, ...keyActionsMap };
  }, {});

  return (state = defaultState, action) => {
    const actionType = action.type;
    const handler = handlersMap[keysMap[actionType]];

    if (handler) {
      return handler(state, action);
    }

    return state;
  };
};
