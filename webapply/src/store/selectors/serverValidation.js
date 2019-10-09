export const getServerValidation = state => state.serverValidation;

export const getServerValidationInputs = state => getServerValidation(state).inputs;

export const getInputServerValidityByPath = (state, path) =>
  getServerValidationInputs(state)[path] || null;
